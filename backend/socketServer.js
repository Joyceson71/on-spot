const { Server } = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const { Message, Notification, NotificationPreference, User } = require('./models');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onspot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Socket Server: Connected to MongoDB'))
  .catch(err => console.error('Socket Server: MongoDB connection error:', err));

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// We still maintain a volatile mapping of connected socket sockets for real-time delivery
const connectedUsers = {}; // socket.id -> userId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Authenticate and register user
  socket.on('register', async (userId) => {
    connectedUsers[socket.id] = userId;
    socket.join('user_' + userId);
    console.log('Registered user:', userId);
    
    // Fetch and send unread notifications from MongoDB
    try {
      const userNotifs = await Notification.find({ userId, isRead: false }).sort({ timestamp: -1 });
      socket.emit('unread_notifications', userNotifs);
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  });

  // Update Notification Preferences
  socket.on('update_preferences', async ({ userId, all, categories }) => {
    try {
      await NotificationPreference.findOneAndUpdate(
        { userId },
        { all, categories },
        { upsert: true, new: true }
      );
      console.log('Updated preferences for', userId);
    } catch (err) {
      console.error('Error updating preferences', err);
    }
  });

  // Dealer posts a job -> Create notifications
  socket.on('post_job', async (jobData) => {
    console.log('Job posted:', jobData.title, jobData.category);
    
    try {
      // Find all users who either want ALL notifications, or specifically this category
      const interestedPreferences = await NotificationPreference.find({
        $or: [
          { all: true },
          { categories: jobData.category }
        ]
      });

      for (const pref of interestedPreferences) {
        const userId = pref.userId;
        
        // Create notification in DB
        const notif = new Notification({
          userId,
          type: 'new_job',
          content: {
            title: 'New ' + jobData.category + ' Job',
            message: 'A new ' + jobData.category + ' job has been posted.',
            location: jobData.location,
            payAmount: jobData.payAmount,
            jobId: jobData.id || jobData._id
          }
        });
        await notif.save();
        
        // Push in real-time
        io.to('user_' + userId).emit('new_notification', notif);
      }
    } catch (err) {
      console.error('Error processing post_job notifications', err);
    }
  });

  // Mark notification read
  socket.on('mark_notification_read', async (notifId) => {
    try {
      await Notification.findByIdAndUpdate(notifId, { isRead: true });
    } catch (err) {
      console.error('Error marking notification read', err);
    }
  });

  // Join Chat Room
  socket.on('join_chat', async (conversationId) => {
    socket.join(conversationId);
    
    // Send message history from MongoDB
    try {
      const history = await Message.find({ conversationId }).sort({ timestamp: 1 });
      socket.emit('chat_history', history);
    } catch (err) {
      console.error('Error fetching chat history', err);
    }
  });

  // Send Message
  socket.on('send_message', async (data) => {
    try {
      const msg = new Message({
        conversationId: data.conversationId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message
      });
      await msg.save();
      
      // Broadcast to room
      io.to(data.conversationId).emit('receive_message', msg);
      
      // Notify receiver if they are not active in the room (simple presence check via socket rooms is complex, we just emit general notif)
      io.to('user_' + data.receiverId).emit('message_notification', msg);
    } catch (err) {
      console.error('Error saving message', err);
    }
  });

  // Typing Indicator (transient, no DB)
  socket.on('typing', (data) => {
    socket.to(data.conversationId).emit('user_typing', data.senderId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete connectedUsers[socket.id];
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log('Socket.IO Server running on port', PORT);
});

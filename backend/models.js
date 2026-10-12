const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  role: { type: String, enum: ['seeker', 'dealer', 'admin'], default: 'seeker' },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },
  rating: { type: Number, default: 5.0 },
  createdAt: { type: Date, default: Date.now }
});

const JobSchema = new mongoose.Schema({
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  locationCoordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  endDateTime: { type: Date, required: true },
  payAmount: { type: Number, required: true },
  slotsTotal: { type: Number, required: true },
  slotsFilled: { type: Number, default: 0 },
  description: { type: String },
  requirements: { type: String },
  dressCode: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

JobSchema.index({ locationCoordinates: '2dsphere' });

const SavedJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  savedAt: { type: Date, default: Date.now }
});
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['Applied', 'Under Review', 'Accepted', 'Rejected', 'Cancelled', 'Completed'], default: 'Applied' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  appliedAt: { type: Date, default: Date.now }
});

const ShiftSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['Upcoming', 'Active', 'Completed', 'Cancelled'], default: 'Upcoming' },
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
});

const SupportTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Under Review', 'Resolved', 'Closed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const RefundRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  reason: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending Review', 'Under Review', 'Approved', 'Rejected', 'Processing', 'Refunded'], default: 'Pending Review' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failed', 'Refunded'], default: 'Pending' },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const MessageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  timestamp: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  content: {
    title: String,
    message: String,
    location: String,
    payAmount: Number,
    jobId: String
  },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

const NotificationPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  all: { type: Boolean, default: false },
  categories: { type: [String], default: [] }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Job: mongoose.model('Job', JobSchema),
  Application: mongoose.model('Application', ApplicationSchema),
  Shift: mongoose.model('Shift', ShiftSchema),
  SupportTicket: mongoose.model('SupportTicket', SupportTicketSchema),
  RefundRequest: mongoose.model('RefundRequest', RefundRequestSchema),
  Payment: mongoose.model('Payment', PaymentSchema),
  SavedJob: mongoose.model('SavedJob', SavedJobSchema),
  Message: mongoose.model('Message', MessageSchema),
  Notification: mongoose.model('Notification', NotificationSchema),
  NotificationPreference: mongoose.model('NotificationPreference', NotificationPreferenceSchema)
};

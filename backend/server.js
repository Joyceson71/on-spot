const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Application, Shift, SupportTicket, RefundRequest, SavedJob, Job } = require('./models');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onspot')
  .then(() => console.log('MongoDB connected successfully (REST API)'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mock authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    // In production, verify the token properly
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Contains userId
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// ----------------------------------------------------
// 12. JOBS API
// ----------------------------------------------------

app.get('/api/jobs', async (req, res) => {
  try {
    const currentTime = new Date();
    const jobs = await Job.find({
      isActive: true,
      endDateTime: { $gt: currentTime }
    }).populate('dealerId');
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    // In a real app, use `authenticate` middleware and `req.user.id`. 
    // Here we map frontend data directly for the E2E connection fix.
    const jobData = req.body;
    
    const newJob = new Job({
      dealerId: "650c1f1f1c9d440000a1b1c1", // Mock dealer ObjectId for now
      title: jobData.title,
      category: jobData.category,
      location: jobData.loc,
      date: new Date(jobData.date),
      time: jobData.time,
      endDateTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Mock 24h end
      payAmount: jobData.rawPay,
      slotsTotal: jobData.slotsTotal,
      slotsFilled: 0,
      description: jobData.description || "",
      requirements: jobData.requirements || "",
      genderReq: jobData.genderReq || "any",
      phone: jobData.phone,
      isActive: true
    });

    await newJob.save();
    res.status(201).json({ success: true, job: newJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 13. APPLICATION API
// ----------------------------------------------------

app.post('/api/applications', authenticate, async (req, res) => {
  try {
    const { jobId, endDateTime } = req.body;
    
    // Server-side expiry validation
    if (endDateTime && new Date() > new Date(endDateTime)) {
      return res.status(400).json({ error: 'This shift has expired. Application rejected.' });
    }

    // Validate if already applied
    const existing = await Application.findOne({ userId: req.user.id, jobId });
    if (existing) {
      return res.status(400).json({ error: 'Already applied for this job' });
    }

    const application = new Application({
      userId: req.user.id,
      jobId,
      status: 'Applied'
    });
    
    await application.save();

    // Automatically create a Shift entry in Upcoming status
    const shift = new Shift({
      applicationId: application._id,
      userId: req.user.id,
      jobId: jobId,
      status: 'Upcoming'
    });
    await shift.save();

    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/applications/my', authenticate, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).populate('jobId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/applications/:id/status', authenticate, async (req, res) => {
  try {
    // Only authorized roles (e.g. Dealer/Admin) should change status
    if (req.user.role !== 'dealer' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 14. MY SHIFTS API
// ----------------------------------------------------

app.get('/api/my-shifts', authenticate, async (req, res) => {
  try {
    const shifts = await Shift.find({ userId: req.user.id }).populate('jobId');
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 15. SUPPORT API
// ----------------------------------------------------

app.post('/api/support/tickets', authenticate, async (req, res) => {
  try {
    const { category, jobId, paymentId, description } = req.body;
    const ticket = new SupportTicket({
      userId: req.user.id,
      category,
      jobId,
      paymentId,
      description
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/support/tickets', authenticate, async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ userId: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/support/tickets/:id', authenticate, async (req, res) => {
  try {
    const ticket = await SupportTicket.findOne({ _id: req.params.id, userId: req.user.id });
    if (!ticket) return res.status(404).json({ error: 'Not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 16. REFUND API
// ----------------------------------------------------

app.post('/api/refunds', authenticate, async (req, res) => {
  try {
    const { jobId, paymentId, reason, description, amount } = req.body;
    const refund = new RefundRequest({
      userId: req.user.id,
      jobId,
      paymentId,
      reason,
      description,
      amount
    });
    await refund.save();
    res.status(201).json(refund);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/refunds/my', authenticate, async (req, res) => {
  try {
    const refunds = await RefundRequest.find({ userId: req.user.id });
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/refunds/:id/status', authenticate, async (req, res) => {
  try {
    // Only admins should approve refunds
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    
    const { status } = req.body;
    const refund = await RefundRequest.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    res.json(refund);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 17. SAVED JOBS & NEARBY JOBS API
// ----------------------------------------------------

app.post('/api/saved-jobs', authenticate, async (req, res) => {
  try {
    const { jobId } = req.body;
    const existing = await SavedJob.findOne({ userId: req.user.id, jobId });
    if (existing) return res.status(400).json({ error: 'Job already saved' });

    const savedJob = new SavedJob({ userId: req.user.id, jobId });
    await savedJob.save();
    res.status(201).json({ success: true, savedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/saved-jobs', authenticate, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.user.id }).populate('jobId');
    res.json({ success: true, savedJobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs/nearby', async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    if (!lat || !lng || !radius) {
      return res.status(400).json({ error: 'Missing location parameters' });
    }
    
    const maxDistance = parseInt(radius) * 1000; // Convert km to meters
    const currentTime = new Date();

    const jobs = await Job.find({
      isActive: true,
      endDateTime: { $gt: currentTime }, // Exclude expired jobs
      locationCoordinates: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: maxDistance
        }
      }
    });
    
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

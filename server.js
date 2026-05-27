import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const BACKUP_FILE = path.join(process.cwd(), 'messages.json');

async function sendEmailNotification(messageData) {
  const { name, email, whatsapp, message } = messageData;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpReceiver = process.env.SMTP_RECEIVER || 'tonifavouretim@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.warn('Email notification skipped: SMTP_USER or SMTP_PASS environment variables are not configured.');
    return;
  }

  // Create transporter using Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  // 1. Thank you confirmation email to the Sender
  const senderMailOptions = {
    from: `"ToniDev" <${smtpUser}>`,
    to: email,
    subject: 'Thank you for reaching out to ToniDev 👋',
    text: `Hi ${name},
Thank you for contacting ToniDev!
I have received your message and will get back to you as soon as possible, typically within 24 hours.
While you wait, feel free to explore my work and projects at my portfolio.
Looking forward to connecting with you!

Best regards,
ToniDev
Full-Stack web Developer.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #334155;">
        <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">Thank you for reaching out to ToniDev 👋</h2>
        <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">Hi ${name},</p>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for contacting ToniDev!</p>
        <p style="font-size: 16px; line-height: 1.6;">I have received your message and will get back to you as soon as possible, typically within 24 hours.</p>
        <p style="font-size: 16px; line-height: 1.6;">While you wait, feel free to explore my work and projects at my <a href="https://tonidev-portfolio.vercel.app" style="color: #2563eb; text-decoration: none; font-weight: bold;">portfolio</a>.</p>
        <p style="font-size: 16px; line-height: 1.6;">Looking forward to connecting with you!</p>
        <div style="margin-top: 30px; border-top: 1px solid #edf2f7; padding-top: 15px;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #475569;">Best regards,</p>
          <p style="font-size: 16px; line-height: 1.6; font-weight: bold; margin: 4px 0 0 0; color: #1e293b;">ToniDev</p>
          <p style="font-size: 14px; color: #64748b; margin: 0;">Full-Stack web Developer.</p>
        </div>
      </div>
    `
  };

  // 2. Notification email to ToniDev
  const toniMailOptions = {
    from: `"${name} via Portfolio" <${smtpUser}>`,
    to: smtpReceiver,
    replyTo: email,
    subject: `New Portfolio Message from ${name}`,
    text: `Hi ToniDev,
You have a new message from your portfolio contact form. Here are the details:
👤 Name: ${name}
📧 Email: ${email}
📌 Subject: Portfolio Contact Message
💬 Message:
${message}
WhatsApp Number: ${whatsapp || 'Not provided'}

Reply directly to this email or reach them at ${email} as soon as possible.

ToniDev Portfolio.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #334155;">
        <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Hi ToniDev,</p>
        <p style="font-size: 16px; line-height: 1.6; color: #475569;">You have a new message from your portfolio contact form. Here are the details:</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>👤 Name:</strong> ${name}</p>
          <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
          <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>📌 Subject:</strong> Portfolio Contact Message</p>
          <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>💬 Message:</strong></p>
          <div style="background-color: #ffffff; border-left: 4px solid #2563eb; padding: 12px 16px; margin: 5px 0 10px 0; border-radius: 4px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #1e293b;">${message}</div>
          <p style="margin: 0; font-size: 15px;"><strong>WhatsApp Number:</strong> ${whatsapp || 'Not provided'}</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">Reply directly to this email or reach them at <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a> as soon as possible.</p>
        
        <div style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px;">
          <p style="font-size: 13px; color: #64748b; font-weight: bold; margin: 0;">ToniDev Portfolio.</p>
        </div>
      </div>
    `
  };

  try {
    await Promise.all([
      transporter.sendMail(senderMailOptions),
      transporter.sendMail(toniMailOptions)
    ]);
    console.log(`Notification and thank-you emails successfully sent`);
  } catch (error) {
    console.error('Failed to send email notification:', error.message);
  }
}

// Set DNS servers to resolve MongoDB Atlas SRV records correctly on some Windows configurations
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Disable buffering globally
mongoose.set('bufferCommands', false);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2500, // Quick fail if database is offline (2.5s instead of 30s)
  bufferCommands: false // Disable buffering for all models on this connection
})
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error event:', err.message);
});

// Schema and Model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  whatsapp: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  bufferCommands: false // Disable buffering so Mongoose queries fail immediately if DB is offline
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// API Route
app.post('/api/contact', async (req, res) => {
  const { name, email, whatsapp, message } = req.body;

  // Validate incoming request body first
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  const messageData = {
    name,
    email,
    whatsapp,
    message,
    createdAt: new Date()
  };

  // Trigger email notification in background (non-blocking)
  sendEmailNotification(messageData).catch(err => {
    console.error('Background email notification failed:', err);
  });

  // Check if MongoDB is connected (readyState 1)
  if (mongoose.connection.readyState !== 1) {
    console.warn('Database connection is not active. Falling back to local storage.');
    try {
      let existingMessages = [];
      try {
        const fileContent = await fs.readFile(BACKUP_FILE, 'utf-8');
        existingMessages = JSON.parse(fileContent);
      } catch (readError) {
        // File doesn't exist yet or is empty/corrupt
      }

      existingMessages.push({ ...messageData, savedLocally: true });
      await fs.writeFile(BACKUP_FILE, JSON.stringify(existingMessages, null, 2), 'utf-8');

      return res.status(201).json({
        success: true,
        message: 'Message received and saved locally (offline mode)',
        data: messageData
      });
    } catch (fsError) {
      console.error('Failed to save message to local fallback:', fsError.message);
      return res.status(503).json({
        success: false,
        message: 'Database is offline and local fallback failed. Please try again later.'
      });
    }
  }

  try {
    const newMessage = new ContactMessage(messageData);
    const savedMessage = await newMessage.save();
    return res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: savedMessage
    });
  } catch (err) {
    console.error('Failed to save message to database:', err.message);

    // If saving to DB fails, try the local fallback as well
    try {
      let existingMessages = [];
      try {
        const fileContent = await fs.readFile(BACKUP_FILE, 'utf-8');
        existingMessages = JSON.parse(fileContent);
      } catch (readError) {}

      existingMessages.push({ ...messageData, savedLocally: true });
      await fs.writeFile(BACKUP_FILE, JSON.stringify(existingMessages, null, 2), 'utf-8');

      return res.status(201).json({
        success: true,
        message: 'Message saved locally (database error fallback)',
        data: messageData
      });
    } catch (fsError) {
      return res.status(500).json({
        success: false,
        message: err.message || 'Failed to save message'
      });
    }
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Express server listener
});


import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dns from 'dns';

// Set DNS servers to resolve MongoDB Atlas SRV records correctly
dns.setServers(['8.8.8.8', '1.1.1.1']);

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
});

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactSchema);

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in environment variables');
    }

    cachedConnection.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  
  try {
    cachedConnection.conn = await cachedConnection.promise;
  } catch (e) {
    cachedConnection.promise = null;
    throw e;
  }

  return cachedConnection.conn;
}

async function sendEmailNotification(messageData) {
  const { name, email, whatsapp, message } = messageData;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpReceiver = process.env.SMTP_RECEIVER || 'tonifavouretim@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.warn('Email notification skipped: SMTP_USER or SMTP_PASS environment variables are not configured.');
    return;
  }

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

  await Promise.all([
    transporter.sendMail(senderMailOptions),
    transporter.sendMail(toniMailOptions)
  ]);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  const { name, email, whatsapp, message } = req.body;

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

  try {
    const emailPromise = sendEmailNotification(messageData).catch(err => {
      console.error('Email notification failed:', err);
    });

    await connectToDatabase();

    const newMessage = new ContactMessage(messageData);
    const savedMessage = await newMessage.save();

    await emailPromise;

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: savedMessage
    });
  } catch (err) {
    console.error('Database connection or save failed:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to save message'
    });
  }
}

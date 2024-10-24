// api/submit-form.js
const { MongoClient } = require('mongodb');
const sendgrid = require('@sendgrid/mail');
const moment = require('moment-timezone');

// Initialize SendGrid
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// MongoDB Connection URI
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    console.warn('Received non-POST request:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { age, sex, email, comments } = req.body;

    if (!age || !sex || !email) {
      console.warn('Missing required fields:', { age, sex, email });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db(); // Uses 'victa-insurance' from URI
    const submissions = database.collection('submissions');

    // Insert submission
    const submission = {
      age,
      sex,
      email,
      comments: comments || '',
      submittedAt: new Date(),
    };
    await submissions.insertOne(submission);
    console.log('Submission saved to MongoDB..');


    // Get the current date in Eastern Time
    const currentDate = moment().tz("America/New_York").format('DD MMMM YYYY, h:mm a');

    // Send Email via SendGrid
    const msg = {
      to: process.env.RECIPIENT_EMAIL,
      from: process.env.SENDGRID_VERIFIED_SENDER,
      subject: `New Insurance Quote Request from ${email}`,
      text: `New quote request\nAge: ${age}\nSex: ${sex}\nEmail: ${email}\nComments: ${comments || 'N/A'}\nSubmitted on: ${currentDate}`,
      html: `
        <p><strong>New quote request</strong></p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Sex:</strong> ${sex}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Comments:</strong> ${comments || 'N/A'}</p>
        <p><strong>Submitted on:</strong> ${currentDate}</p>
      `,
    };

    await sendgrid.send(msg);
    console.log('Confirmation email sent..');

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error in submit-form:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    try {
      await client.close();
      console.log('MongoDB connection closed.');
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }
  }
};

// api/submit-form.js
const { MongoClient } = require('mongodb');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { age, sex, email } = req.body;

    if (!age || !sex || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db('victa-insurance');
    const submissions = database.collection('submissions');

    // Insert submission
    const submission = {
      age,
      sex,
      email,
      submittedAt: new Date(),
    };
    await submissions.insertOne(submission);

    // Send Email via SendGrid
    const msg = {
      to: 'francisvicta45@gmail.com',
      from: 'no-reply@francisvicta.com', // Must be a verified sender in SendGrid
      subject: 'New Insurance Estimate Submission',
      text: `New submission:\nAge: ${age}\nSex: ${sex}\nEmail: ${email}`,
    };

    await sendgrid.send(msg);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

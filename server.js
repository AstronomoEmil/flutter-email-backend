const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing "to", "subject", or "body" in request.' });
  }

  const msg = {
    to,
    from: 'your_verified_email@example.com', // Replace with your verified sender
    subject,
    text: body,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error('SendGrid error:', error.response ? error.response.body : error);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

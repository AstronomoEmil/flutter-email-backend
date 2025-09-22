const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  const msg = {
    to,
    from: 'your_verified_email@example.com', // Must be verified in SendGrid
    subject,
    text: body,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

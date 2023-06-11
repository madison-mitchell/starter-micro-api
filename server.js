const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Configure body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define a helper function to format the email message as HTML
function formatEmailMessage(formData) {
  return `
    <h2>New Contact Form Submission</h2>
    <table>
      <tr>
        <td style="padding-right: 10px;"><strong>First Name:</strong></td>
        <td>${formData.firstName}</td>
      </tr>
      <tr>
        <td style="padding-right: 10px;"><strong>Last Name:</strong></td>
        <td>${formData.lastName}</td>
      </tr>
      <tr>
        <td style="padding-right: 10px;"><strong>Company:</strong></td>
        <td>${formData.company}</td>
      </tr>
      <tr>
        <td style="padding-right: 10px;"><strong>Email:</strong></td>
        <td>${formData.email}</td>
      </tr>
      <tr>
        <td style="padding-right: 10px;"><strong>Phone Number:</strong></td>
        <td>${formData.phoneNumber}</td>
      </tr>
    </table>

    <p>${formData.message}</p>

    <p>This email was sent from your website's contact form.</p>
  `;
}

// Define a POST route to handle the email sending
app.post('/api/send-email', (req, res) => {
  const formData = req.body;

  // Format the email message
  const message = formatEmailMessage(formData);

  // Configure Nodemailer with your email provider's credentials
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false, // Set to true if using port 465 with SSL
    auth: {
      user: 'missmadisonrose@icloud.com',
      pass: 'bvuh-aycs-dryw-poxg',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'missmadisonrose@icloud.com',
    to: 'madisonrmitchell@icloud.com', // Replace with the recipient's email address
    subject: 'New Contact Form Submission',
    html: message, // Use 'html' instead of 'text' for HTML-formatted email
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});



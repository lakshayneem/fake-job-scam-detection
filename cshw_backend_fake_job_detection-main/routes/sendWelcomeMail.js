const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-welcome-mail", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "britvik37@gmail.com",
            pass: "kilg hlnf slbv qokl",
        },
    });

    const mailOptions = {
        from: "britvik37@gmail.com",
        to: email,
        subject: "🚀 Welcome to Fake Job Detector!",
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Fake Job Detector</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      padding: 20px;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      background: #4CAF50;
      padding: 15px;
      color: white;
      font-size: 24px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
    }
    .btn {
      display: inline-block;
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      🚀 Welcome to Fake Job Detector!
    </div>
    <div class="content">
      <p>Hey there,</p>
      <p>We're excited to have you onboard! Fake Job Detector helps you identify fraudulent job postings and stay safe from scams.</p>
      <p>Start checking job postings now and ensure your safety in the job market!</p>
      <a href="https://your-app-link.com" class="btn">Get Started</a>  
    </div>
    <div class="footer">
      <p>Stay Safe, Stay Secure! 😊</p>
      <p>&copy; 2025 Fake Job Detector | All rights reserved</p>
    </div>
  </div>
</body>
</html>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;

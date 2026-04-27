const nodemailer = require("nodemailer");

// Configure nodemailer with Gmail SMTP (ONLY)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp, type = "signup") => {
  try {
    // Check if Gmail credentials are configured
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      process.env.EMAIL_USER === "your-email@gmail.com"
    ) {
      console.error(
        "❌ Gmail credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env"
      );
      return {
        success: false,
        message: "Email service not configured. Please contact admin.",
      };
    }

    const subject =
      type === "signup"
        ? "Verify Your Email - Interview Prep"
        : "Reset Your Password - Interview Prep";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c5aa0; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { background-color: #f9f9f9; padding: 20px; margin-top: 10px; border-radius: 5px; }
            .otp-box { background-color: #e8f5e9; padding: 15px; text-align: center; margin: 20px 0; border-radius: 5px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #2c5aa0; letter-spacing: 5px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Interview Prep</h2>
            </div>
            <div class="content">
              <p>Hi there!</p>
              <p>${
                type === "signup"
                  ? "Welcome to Interview Prep! Please verify your email address to complete your signup."
                  : "We received a request to reset your password. Please use the code below."
              }</p>
              
              <div class="otp-box">
                <p>Your verification code:</p>
                <div class="otp-code">${otp}</div>
              </div>
              
              <p><strong>⏱️ This code will expire in 10 minutes.</strong></p>
              <p>If you didn't request this, please ignore this email.</p>
              
              <p>Thanks,<br>Interview Prep Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Interview Prep. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", email);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
};

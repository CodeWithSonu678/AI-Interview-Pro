const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

async function sendResetMail({ resetUrl, email }) {
  try {
    const info = await transporter.sendMail({
      from: `"AI Interview Pro" <${process.env.AUTH_USER}>`,
      to: email,
      subject: "Reset Your AI Interview Pro Password",
      html: `
            <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;padding:20px;border:1px solid #e5e5e5;border-radius:10px;">
              <h2 style="color:#7C3AED;">Reset Your Password</h2>
      
              <p>Hello,</p>
      
              <p>We received a request to reset your AI Interview Pro account password.</p>
      
              <p style="text-align:center;margin:30px 0;">
                <a
                  href="${resetUrl}"
                  style="
                    background:#7C3AED;
                    color:#fff;
                    padding:12px 25px;
                    text-decoration:none;
                    border-radius:8px;
                    display:inline-block;
                  "
                >
                  Reset Password
                </a>
              </p>
      
              <p>This link will expire in <strong>15 minutes</strong>.</p>
      
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
      
              <hr />
      
              <small>© AI Interview Pro</small>
            </div>
          `,
    });

    
  } catch (error) {
    console.error("Mail Error:", error);
  }
}

module.exports = { sendResetMail };

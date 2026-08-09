const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hindustanprojects0.2@gmail.com',
    pass: 'sbecchomfbrgkrwx'
  },
  tls: { rejectUnauthorized: false }
});

async function sendTest() {
  console.log('Sending test email to dilsedilshan1@gmail.com ...');
  try {
    const info = await transporter.sendMail({
      from: '"Hindustan Projects Portal" <hindustanprojects0.2@gmail.com>',
      to: 'dilsedilshan1@gmail.com',
      subject: 'Test Email — Hindustan Projects Empanelment Portal ✅',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0">
          <div style="background:#0047AB;color:white;padding:20px 28px">
            <h2 style="margin:0;font-size:20px">Hindustan Projects</h2>
            <p style="margin:4px 0 0;opacity:.85;font-size:13px">Empanelment Portal — Email System Test</p>
          </div>
          <div style="background:white;padding:28px">
            <h3 style="color:#0047AB;margin-top:0">✅ Email System Working Perfectly!</h3>
            <p style="color:#334155">Namaste! Yeh ek <strong>test email</strong> hai Hindustan Projects Empanelment Portal ki email system se.</p>
            <p style="color:#334155">Agar aapko yeh email mil raha hai toh email system <strong>100% properly working</strong> hai.</p>
            <div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:14px 18px;margin:18px 0">
              <p style="margin:0;color:#166534;font-weight:bold">🟢 SMTP Gmail System: Active & Operational</p>
              <p style="margin:4px 0 0;color:#166534;font-size:13px">From: hindustanprojects0.2@gmail.com via Port 465 SSL</p>
            </div>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:18px 0">
            <p style="color:#64748B;font-size:12px;margin:0">
              Sent at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br>
              Hindustan Projects Admin Panel | empanelment.hindustanprojects.in
            </p>
          </div>
        </div>
      `
    });
    console.log('\nSUCCESS! Email sent!');
    console.log('MessageId:', info.messageId);
    console.log('Response:', info.response);
  } catch (err) {
    console.error('\nFAILED:', err.message);
  }
}

sendTest();

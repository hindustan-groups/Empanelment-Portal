import nodemailer from 'nodemailer';

const user = process.env.EMAIL_USER || 'hindustanprojects0.2@gmail.com';
const pass = process.env.EMAIL_APP_PASS || 'sbecchomfbrgkrwx';

console.log('⏳ Connecting to Gmail SMTP Server...');
console.log(`📧 Sender Email Account: ${user}`);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user, pass },
  tls: { rejectUnauthorized: false }
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Hindustan Projects Portal" <${user}>`,
      to: 'empanelment@hindustanprojects.in',
      subject: '🧪 Test Email Verification — Hindustan Projects Portal',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
          <h2 style="color: #0047AB;">Hindustan Projects — Email System Active ✅</h2>
          <p>This is an automated test email confirming that your transactional email server is 100% active and working.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
    console.log(`📌 Message ID: ${info.messageId}`);
    console.log(`📡 Response  : ${info.response}`);
  } catch (err) {
    console.error('\n❌ EMAIL SEND FAILED!');
    console.error('   Details:', err.message);
  }
}

testEmail();

// Vercel Serverless Function for Contact Form
// Uses Resend for email delivery

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL = process.env.TO_EMAIL || 'paulabrahams@outlook.com';

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured. Please add RESEND_API_KEY.' });
  }

  try {
    const { name, email, telephone, subject, message, website } = req.body || {};

    if (website) {
      return res.status(400).json({ error: 'Spam detected' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Longwood Management <onboarding@resend.dev>',
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Enquiry: ${subject || 'Website Contact Form'}`,
        text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone || 'Not provided'}\nBudget: ${subject || 'Not specified'}\n\nMessage:\n${message}`,
        html: `
          <h2>New Enquiry from Longwood Management Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telephone:</strong> ${telephone || 'Not provided'}</p>
          <p><strong>Budget:</strong> ${subject || 'Not specified'}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', JSON.stringify(data));
      // Return more specific error message
      const errorMsg = data.message || data.error || 'Failed to send email';
      return res.status(500).json({ error: errorMsg });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}

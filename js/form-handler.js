// Contact Form Handler for Longwood Management Ltd
// Sends form data to Vercel serverless function

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const sendBtn = document.getElementById('send-btn');
    const sendBtnText = document.getElementById('send-btn-text');
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        statusDiv.textContent = '';
        statusDiv.style.color = '';

        // Get form values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject ? form.subject.value : '';
        const message = form.message.value.trim();
        const honeypot = form.website ? form.website.value.trim() : '';

        // Honeypot spam check
        if (honeypot) {
            statusDiv.textContent = 'Spam detected.';
            statusDiv.style.color = '#ef4444';
            return;
        }

        // Validate required fields
        if (!name || !email || !message) {
            statusDiv.textContent = 'Please fill in all required fields.';
            statusDiv.style.color = '#ef4444';
            return;
        }

        // Email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            statusDiv.textContent = 'Please enter a valid email address.';
            statusDiv.style.color = '#ef4444';
            return;
        }

        // Disable button and show loading state
        sendBtn.disabled = true;
        sendBtnText.textContent = 'Sending...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    website: honeypot
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                statusDiv.textContent = 'Thank you! Your enquiry has been sent successfully.';
                statusDiv.style.color = '#D4AF37';
                form.reset();
            } else {
                statusDiv.textContent = result.error || 'There was a problem sending your enquiry. Please try again.';
                statusDiv.style.color = '#ef4444';
            }
        } catch (err) {
            console.error('Form submission error:', err);
            statusDiv.textContent = 'Network error. Please try again or email us directly.';
            statusDiv.style.color = '#ef4444';
        } finally {
            sendBtn.disabled = false;
            sendBtnText.textContent = 'Submit Enquiry';
        }
    });
});

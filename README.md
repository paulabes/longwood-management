# Longwood Management Ltd Website

A professional website for Longwood Management Ltd, a British construction and property management company based in London.

## Project Structure

```
longwood-management/
├── index.html              # Main landing page
├── privacy-policy.html     # Privacy policy page
├── terms-and-conditions.html
├── vercel.json             # Vercel deployment config
├── api/
│   └── contact.js          # Serverless contact form handler
├── css/
│   └── styles.css          # Custom styles
├── js/
│   └── form-handler.js     # Form validation and submission
└── img/                    # Local images
```

## Deployment to Vercel

### 1. Set up Resend (Email Service)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. (Optional) Add and verify your domain for custom "from" address

### 2. Deploy to Vercel

1. Push this folder to a Git repository (GitHub, GitLab, etc.)
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel project settings:

   | Variable | Value |
   |----------|-------|
   | `RESEND_API_KEY` | Your Resend API key |
   | `TO_EMAIL` | Email to receive enquiries (default: info@longwoodmanagement.com) |

4. Deploy!

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `TO_EMAIL` | No | Recipient email (default: info@longwoodmanagement.com) |

## Local Development

To test locally with Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

## Features

- Responsive design for all devices
- Smooth scroll animations
- Glass-morphism UI effects
- Contact form with Resend email delivery
- Honeypot spam protection
- Security headers configured

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)

## License

All content and materials are property of Longwood Management Ltd.

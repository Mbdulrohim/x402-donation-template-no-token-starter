# x402 Donation Template (No Token Starter)

A minimal Next.js starter template for building donation pages with x402 payment integration. This is a **bare-bones guide** with no UI design, providing the essential structure for developers to customize and build their own branded donation experiences.

## 📖 Overview

### What is this?

This is a **stripped-down starter** for creating donation pages. It includes:

- Basic `page.tsx` with generic buttons and inputs
- Core project files (package.json, config, etc.)
- No styling or complex UI components
- Serves as a foundation for custom designs

### Why use this?

- ✅ **Clean starting point** - No design assumptions, build your own UI
- ✅ **Essential structure** - All necessary files included
- ✅ **x402 ready** - Payment integration framework in place
- ✅ **Customizable** - Add your branding, themes, and features
- ✅ **Guide for developers** - Learn the core patterns and extend

### How to use

1. **Download/Fork** this template
2. **Customize the UI** in `page.tsx` - add your styles, components, branding
3. **Configure environment** variables for your project
4. **Deploy** and start accepting donations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Solana wallet
- Basic understanding of Next.js

### Setup

1. **Clone/Download** this template
2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment:**

   ```bash
   cp .env.example .env.local
   # Edit with your project details
   ```

4. **Run locally:**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Customize `app/page.tsx`** - Add your UI design and features

### Environment Variables

```bash
# Project Info
NEXT_PUBLIC_PROJECT_NAME=Your Project Name
NEXT_PUBLIC_PROJECT_DESCRIPTION=Your project description

# Wallet (receives donations)
RESOURCE_SERVER_WALLET_ADDRESS=your_solana_wallet_address

# Network
NEXT_PUBLIC_SOLANA_NETWORK=solana-devnet  # or 'solana' for mainnet

# x402 Facilitator
FACILITATOR_URL=https://facilitator.payai.network
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Main donation page (customize this!)
│   ├── layout.tsx        # App layout
│   ├── globals.css       # Global styles (add your CSS here)
│   └── api/              # API routes for donations
├── components/           # Reusable components (add your UI components)
├── lib/                  # Utility functions
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.ts        # Next.js config
└── README.md             # This file
```

## 🎨 Customization Guide

### Basic Page Structure

The `app/page.tsx` currently has:

- Simple title and description
- Amount input field
- Generic buttons for quick amounts ($1, $5, $10, $15)
- Donate button

### Adding Your Design

1. **Styling:** Add CSS classes, Tailwind, or styled-components
2. **Components:** Create reusable UI components in `/components`
3. **Branding:** Add your logo, colors, fonts
4. **Features:** Add progress bars, stats, animations, etc.

### Example Customizations

```tsx
// Add your styling
<div className="my-custom-donation-form">
  <h1 className="text-3xl font-bold text-blue-600">Support Our Project</h1>
  {/* Your custom UI here */}
</div>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set environment variables
4. Deploy

### Other Platforms

- Netlify
- Railway
- Self-hosted

## 🔗 Related Resources

- [x402 Protocol](https://x402.org) - Payment protocol docs
- [Next.js](https://nextjs.org) - Framework documentation
- [Solana Docs](https://docs.solana.com) - Blockchain integration

## 📄 License

MIT

---

**Built as a guide for the PayAI Network ecosystem**

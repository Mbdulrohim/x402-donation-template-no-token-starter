# File Guide: x402 Donation Template (No Token Starter)

This guide explains the purpose of each file in this minimal donation template starter. This is a stripped-down version with no UI, serving as a foundation for custom implementations.

## Root Files

- **README.md** - Project overview, setup instructions, and customization guide
- **package.json** - Node.js dependencies and scripts
- **pnpm-lock.yaml** - Lockfile for pnpm package manager
- **next.config.ts** - Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tsconfig.tsbuildinfo** - TypeScript build cache (generated)
- **eslint.config.mjs** - ESLint configuration
- **jest.config.js** - Jest testing configuration
- **jest.setup.js** - Jest setup file
- **drizzle.config.ts** - Database schema configuration (Drizzle ORM)
- **middleware.ts** - Next.js middleware for x402 payment handling
- **postcss.config.mjs** - PostCSS configuration
- **components.json** - shadcn/ui configuration (can be removed if not using)
- **fixes.md** - Notes on fixes applied (project-specific)
- **README.test.md** - Testing documentation

## Environment Files

- **.env.example** - Example environment variables
- **.env.local** - Local environment variables (configure with your settings)

## App Directory (`app/`)

- **page.tsx** - Main donation page (currently basic HTML, customize with your UI)
- **layout.tsx** - Root layout component
- **head.tsx** - HTML head configuration
- **globals.css** - Global CSS styles (add your styles here)
- **.well-known/x402.json/route.ts** - x402 protocol schema endpoint

## API Routes (`app/api/`)

- **messages/route.ts** - GET endpoint to retrieve donation messages
- **messages/route.test.ts** - Tests for messages API
- **write-message/route.ts** - POST endpoint for writing messages (protected by x402)
- **write-message/route.test.ts** - Tests for write-message API
- **donate/1/route.ts** - Donation endpoint for $1
- **donate/5/route.ts** - Donation endpoint for $5
- **donate/10/route.ts** - Donation endpoint for $10

## Database (`db/`)

- **index.ts** - Database connection setup
- **schema.ts** - Database schema definitions

## Hooks (`hooks/`)

- **use-is-client.ts** - Hook to check if running on client-side
- **use-x402-payment.ts** - Hook for x402 payment integration

## Library (`lib/`)

- **db.ts** - Database utilities
- **donation-handler.ts** - Donation processing logic
- **solana.ts** - Solana blockchain utilities
- **token.ts** - Token-related functions
- **utils.ts** - General utility functions
- **empty.js** - Placeholder file

## Public Assets (`public/`)

- **file.svg, globe.svg, next.svg, vercel.svg, window.svg** - Default Next.js assets

## Scripts (`scripts/`)

- **setup-tests.sh** - Script to set up test environment

## Tests (`__tests__/`)

- **components/** - Component tests (empty now)
- **integration/** - Integration tests
- **utils/** - Utility tests

## GitHub (`.github/`)

- **workflows/test.yml** - GitHub Actions CI/CD pipeline

## Other

- **.gitignore** - Git ignore patterns
- **.swc/** - SWC compiler cache

## Key Implementation Files

For customization, focus on:

- `app/page.tsx` - Add your UI design
- `app/globals.css` - Add your styles
- `lib/donation-handler.ts` - Modify donation logic if needed
- `hooks/use-x402-payment.ts` - Customize payment flow
- API routes in `app/api/` - Extend functionality

## Removed Files

- All UI components from `components/` folder (stripped for minimal starter)
- node_modules/ (reinstall with `pnpm install`)
- .next/ (generated on build)

This template provides the core donation functionality without any visual design, allowing you to build your own branded experience on top.

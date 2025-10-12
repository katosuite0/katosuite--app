# KatoSuite

A comprehensive lesson planning platform built with Next.js, TypeScript, and modern web technologies.

## Features

- 🌍 **Internationalization**: Support for English and French
- 💳 **Multiple Plans**: Free, Starter+, and Pro plans with different features
- 📚 **Library**: Automatic saving of valid lessons (Starter+ and Pro only)
- 🤖 **AI Generation**: AI-powered lesson content generation (Starter+ and Pro)
- 📤 **Export**: Export lessons with plan overlay and footer
- 🔒 **Authentication**: Supabase authentication with Row Level Security
- 💰 **Payment**: Stripe integration for subscriptions
- 📧 **Email**: SendGrid for transactional emails
- ⚡ **Rate Limiting**: 10 requests/minute for AI and export endpoints
- 🧪 **Testing**: Playwright with axe-core for accessibility testing
- 📊 **Performance**: Lighthouse CI for performance monitoring
- 🔍 **SEO**: Sitemap, robots.txt, and JSON-LD structured data

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Authentication**: Supabase
- **Payments**: Stripe
- **Email**: SendGrid
- **Testing**: Playwright + axe-core
- **Linting**: ESLint
- **Performance**: Lighthouse CI

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase, Stripe, and SendGrid credentials.

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
katosuite--app/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with i18n
│   │   ├── page.tsx       # Homepage
│   │   ├── pricing/       # Pricing page
│   │   └── library/       # Library page
│   ├── api/               # API routes
│   │   ├── library/       # Library endpoints
│   │   ├── export/        # Export endpoints
│   │   └── ai/            # AI generation endpoints
│   ├── globals.css        # Global styles
│   └── sitemap.ts         # Dynamic sitemap
├── config/
│   └── plans.json         # Plan configurations and limits
├── i18n/
│   ├── messages/          # Translation files
│   ├── request.ts         # i18n configuration
│   └── routing.ts         # i18n routing
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── plans.ts           # Plan utilities
│   └── rate-limit.ts      # Rate limiting
├── public/
│   └── robots.txt         # Robots configuration
└── tests/
    └── accessibility.spec.ts  # Playwright tests

```

## Configuration

### Plans

Plan configurations are stored in `config/plans.json`. Each plan includes:
- Pricing in USD (no trial text)
- Feature flags (library, AI generation, export)
- Rate limits (lessons per month, exports per minute, AI requests per minute)

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `SENDGRID_API_KEY`: SendGrid API key
- `NEXT_PUBLIC_BASE_URL`: Application base URL

## Features

### Library (Starter+ and Pro)

- Automatically saves valid lessons (no author/date stored)
- Only accessible to Starter+ and Pro users
- Implements Row Level Security with Supabase

### Export

- All plans can export lessons
- Free plan shows upgrade overlay
- Immutable footer ≤14px
- Rate limited to 10 exports per minute

### Rate Limiting

- AI generation: 10 requests/minute
- Export: 10 requests/minute
- Tracked per user/IP address

### Idempotent POSTs

All POST endpoints support idempotency keys to prevent duplicate operations.

## Testing

Run Playwright tests:
```bash
pnpm test
```

Run accessibility tests with axe-core:
```bash
pnpm test accessibility
```

## Linting

Run ESLint:
```bash
pnpm lint
```

ESLint is configured for:
- Semantic HTML headings
- Accessibility rules
- TypeScript best practices
- Files under 300 lines of code

## Deployment

Deploy to Vercel:
```bash
vercel
```

The project includes `vercel.json` for proper configuration.

## License

Apache 2.0

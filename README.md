# Handcrafted Haven

A marketplace for artisans to showcase and sell handmade goods.

## Team

Drew Jezek, Adam Cottam, Denton Flake, Abbigail Nelson, Icaro San Angelo

## Tech Stack

- **Framework**: Next.js (App Router)
- **Database**: PostgreSQL via Supabase
- **Auth**: better-auth
- **Styles**: Tailwind CSS v4
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd handcrafted-haven
npm install
```

### 2. Configure environment variables

```bash
cp .env.sample .env
```

Fill in `.env`:

```
DATABASE_URL=        # Supabase → Settings → Database → Connection string → URI
BETTER_AUTH_SECRET=  # Any long random string: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=                 # Supabase project URL for image storage
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=images
SUPABASE_SERVICE_ROLE_KEY=                # Supabase service role key for server-side uploads
```

### 3. Run database migrations

```bash
npm run db:migrate
```

This runs better-auth's schema (auth tables) followed by the app schema (`app/lib/schema.sql`).

> All statements use `IF NOT EXISTS`, so re-running is safe and won't wipe existing data.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script               | Description                 |
| -------------------- | --------------------------- |
| `npm run dev`        | Start local dev server      |
| `npm run build`      | Production build            |
| `npm run db:migrate` | Run all database migrations |
| `npm run lint`       | Run ESLint                  |

## Project Structure

```
app/
  (protected)/        # Auth-gated routes
    dashboard/        # Seller dashboard
  api/auth/           # better-auth API handler
  components/         # Shared components
  lib/
    auth.ts           # better-auth server config
    auth-client.ts    # Client-side auth
    db.ts             # Postgres connection pool
    schema.sql        # App database schema
    types.ts          # TypeScript types
  login/
  signup/
  products/           # Public product pages
scripts/
  migrate.js          # Migration runner
```

## Database Schema

App tables are defined in `app/lib/schema.sql`. To make a schema change, edit that file and re-run `npm run db:migrate`.

better-auth manages its own tables (`user`, `session`, `account`, `verification`) automatically.

## Deployment

Deploy to [Vercel](https://vercel.com). Add the same environment variables from `.env` to your Vercel project settings, then run `npm run db:migrate` once against your production database.

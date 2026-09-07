# Alphamed Cure — B2B Medical & Pharmaceutical Supply Platform

A scalable, secure B2B healthcare procurement and pharmaceutical distribution web application built with **Next.js 15 (App Router)**, **JavaScript**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL (Supabase)**.

---

## 🌟 Architectural Highlights

1. **Server-Level Price Security & Isolation**:
   - In accordance with B2B pharmaceutical compliance, live contract rates, USD conversions, and MOQs are strictly isolated at the query level (`lib/products.js`).
   - Prices are **never** returned to the browser for public visitors or unverified accounts.
   - Only verified institutional accounts (hospitals, licensed clinics, approved distributors) or administrators receive price relations.

2. **Triple-Verified Admin Security**:
   - **Layer 1**: Next.js Edge `middleware.js` blocks unauthorized requests to `/admin` and `/api/admin`.
   - **Layer 2**: Server component layout guard (`app/admin/layout.js`) verifies the user session role server-side.
   - **Layer 3**: Each API route handler validates role permissions independently (`requireAdmin()` in `lib/auth.js`).

3. **Inquiry & Institutional RFQ Cart**:
   - Healthcare procurement officers can compile custom formulation inquiries and submit institutional Requests For Quote (RFQs) with cold-chain and batch specification notes.
   - Automatically records inquiries in PostgreSQL and dispatches notifications via **Resend**.

4. **Zero-Mock Production Ready**:
   - Clean, modular schema in `prisma/schema.prisma` with relations for users, sessions, categories, products, prices, inquiries, contact messages, and server analytics events.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- PostgreSQL database (e.g. [Supabase](https://supabase.com))

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
SESSION_SECRET="alphamed-cure-super-secret-complex-password-32chars-min!"
RESEND_API_KEY="" # Optional: Resend API key for transactional emails
NEXT_PUBLIC_POSTHOG_KEY="" # Optional: PostHog key
```

### 3. Database Migration & Seed
```bash
# Push schema to database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed with standard categories, hospital formulations, and test accounts
npm run db:seed
```

#### Default Seed Accounts:
- **Admin**: `admin@alphamedcure.com` / `Admin@Alphamed2026!`
- **Verified Hospital Client**: `procurement@cityhospital.org` / `Customer@2026!`

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Layout

```text
alphamed_cure/
├── app/
│   ├── (public)/         # Home, About, Compliance, Contact, Products
│   ├── admin/            # Triple-verified Admin Control Center
│   ├── dashboard/        # Customer Partner Portal
│   ├── inquiry/          # Procurement Cart & RFQ Interface
│   ├── login/ & register/# Institutional Auth
│   ├── api/              # Route handlers for auth, inquiries, contact, admin
│   ├── globals.css       # Tailwind CSS v4 design system
│   └── layout.js         # Root layout with SEO and persistent nav
├── components/           # Navbar, Footer, ProductCard
├── lib/                  # Prisma singleton, auth, products, email, analytics, validations
├── prisma/
│   ├── schema.prisma     # Complete relational data model
│   └── seed.js           # Production-ready seed data
├── public/
│   └── assets/           # Alphamed Cure brand logo and assets
└── middleware.js         # Edge security middleware
```

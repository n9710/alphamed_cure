# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Pharmaceutical distributors and wholesalers — procurement decision-makers operating in regulated supply chains. They evaluate partners on reliability, operational depth, and compliance, not just price. Secondary audiences (hospitals, licensed clinics) are relevant but not the primary acquisition target.

## Product Purpose

Alphamed Cure is a B2B healthcare business partner that provides full-cycle Sales Management, Product Management, and Customer Support to businesses in the healthcare products space. The platform gives verified institutional accounts access to a curated product catalog, protected contract pricing, and RFQ (Request For Quote) inquiry submission — all within a secure, authenticated environment.

## Positioning

Full-cycle Sales + Service + Support under one partner. Alphamed Cure is not a bare supplier or marketplace — it embeds itself into clients' operational processes to cover the entire commercial cycle: outbound sales strategy, product portfolio coordination, and ongoing customer support. A neighboring supplier or distributor cannot truthfully claim this embedded partnership model.

## Operating Context

- Procurement officers evaluate the catalog, build inquiry carts, and submit RFQs with cold-chain and batch specification notes.
- Pricing is protected: never exposed to public or unverified visitors; only verified institutional accounts or admins see live contract rates, USD conversions, and MOQs.
- Users go through institutional registration and admin verification before accessing price-sensitive data.
- Admin team manages product catalog, user verification, inquiry review, and contact messages via triple-secured admin panel.
- Communications flow via transactional email (Resend) for inquiry notifications and account events.
- Analytics captured via PostHog for product and user behavior insights.

## Capabilities and Constraints

- Next.js 15 App Router, React, JavaScript, Tailwind CSS v4, Prisma ORM, PostgreSQL (Supabase)
- Authentication: iron-session with server-side role verification (edge middleware + layout guard + route handler triple-layer)
- Product data model: categories, products, prices (protected), inquiries, contact messages, users, sessions, analytics events
- No confirmed product imagery or brand photography — all hero/product images are placeholders for now
- No real testimonials, case studies, certifications (GDP, ISO), or press coverage confirmed yet
- Deploy target: Vercel

## Brand Commitments

- Name: Alphamed Cure
- Tagline: Sales · Service · Support · Healthcare Solutions
- Brand colors: Navy #041E42 (primary authority), Blue #0052CC (active/interactive), white and light slate for surfaces
- Logo: alphamed_crue_logo.png — the only confirmed brand asset; treat as binding
- No invented claims, benchmarks, testimonials, pricing, certifications, or customer names

## Evidence on Hand

- Codebase with full working functionality (auth, catalog, RFQ, admin, dashboard, contact)
- Brand logo file at project root (alphamed_crue_logo.png) and /public/assets/
- No verified case studies, testimonials, certifications, or press assets — future work must not fabricate these

## Product Principles

1. Trust through transparency — pricing is protected not to hide it, but to reserve verified rates for verified partners; every surface should communicate institutional credibility.
2. Partner, not vendor — the full Sales + Service + Support model is the differentiator; copy and UI should reflect a relationship, not a transaction.
3. Operational precision — distributors and wholesalers operate in regulated environments; design must feel reliable, exact, and professional, never playful or speculative.
4. Verified access as a feature — the registration and approval flow is not friction; it is a trust signal that filters serious institutional partners from casual browsers.
5. Content integrity — never fill gaps with invented claims; placeholder copy must be replaced with real facts before launch.

## Accessibility & Inclusion

No product-specific accessibility requirement confirmed beyond WCAG 2.1 AA as a sensible default for a professional B2B platform.

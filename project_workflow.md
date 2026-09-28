# Alphamed Cure Project Workflow & Details

## 1. Project Status & Current Stage
**What is Completed:**
- **Framework & Architecture**: Next.js 15 App Router setup with Tailwind CSS v4 styling.
- **Database Schema**: Full relational database schema is complete in `prisma/schema.prisma` (handling users, categories, products, pricing, and inquiries).
- **Authentication System**: Triple-layered admin security and login functionality are implemented using `iron-session` and `bcryptjs`.
- **API & Logic**: Server-level logic for isolating prices for verified institutions and handling cart/RFQ workflows.
- **Seed Data**: A robust seed file (`prisma/seed.js`) is ready to populate the database with default accounts and products.

**Current Stage:** 
The platform is in a **production-ready foundational state**. The core architecture is solid, but to move forward, it requires an active PostgreSQL database connection (e.g., Supabase) and actual product data entry. 

---

## 2. Email Notifications Workflow
When users send an inquiry or a contact request, the system uses the **Resend API** to dispatch emails (managed in `lib/email.js`).

- **Where do the emails go?**
  - **Admin Alerts**: Notifications for new inquiries or contact messages go to the environment variable `ADMIN_NOTIFICATION_EMAIL`. If not set, it defaults to **`sales@alphamedcure.com`**.
  - **Customer Confirmations**: A confirmation email is sent to the registered email address of the user who submitted the inquiry.
- **How to check them?** 
  - If you haven't added a `RESEND_API_KEY` to your `.env.local` file, the emails are not actually sent over the internet. Instead, they are mocked and logged directly to your terminal console where the Next.js server is running.
  - To send real emails, sign up for Resend, get an API key, and add it to your `.env.local`.

---

## 3. Dummy Credentials Error
The dummy credentials mentioned in the README (`admin@alphamedcure.com` / `Admin@Alphamed2026!` and `procurement@cityhospital.org` / `Customer@2026!`) are defined in `prisma/seed.js`. 

If you are getting an error when trying to log in, it is likely because the dummy users have not been inserted into your database yet. 

**How to fix it:**
Ensure your `DATABASE_URL` is correctly configured in `.env.local`, then run the following commands in your terminal:
1. `npm run db:push` (to sync your database schema)
2. `npm run db:seed` (to generate the dummy accounts and sample data)

---

## 4. Where is Login Data Stored?
- **Persistent Storage**: All user account details (including securely hashed passwords using `bcryptjs`), roles (ADMIN or CUSTOMER), and profile data are stored in your **PostgreSQL Database**. This is managed via the `User` model in `prisma/schema.prisma`.
- **Session Storage**: Once a user logs in successfully, their active session is encrypted and stored in **Browser Cookies** using the `iron-session` library. This is secured by the `SESSION_SECRET` key in your `.env.local` file.

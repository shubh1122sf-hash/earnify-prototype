
# Next.js Leaderboard App

This is a production-ready Next.js 14+ application with a leaderboard, user authentication via Google OAuth (NextAuth.js v4), and data persistence using Prisma.

## Features

- **Authentication**: Google OAuth with NextAuth.js (v4).
- **Database**: Prisma ORM with support for SQLite (local) and Vercel Postgres (production).
- **API Routes**: Secure endpoints for submitting scores and fetching the leaderboard.
- **Protected Routes**: Middleware protects pages and APIs, redirecting unauthenticated users to a login page.
- **Real-time Updates**: Leaderboard auto-refreshes every 20 seconds.
- **Input Validation**: `zod` for validating API inputs.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [NextAuth.js](https://next-auth.js.org/) (v4)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)

---

## Local Development Setup

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- `npm` or `yarn` or `pnpm`

### 2. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Google OAuth Credentials

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2.  Create a new project or select an existing one.
3.  Go to **Credentials** and click **Create Credentials** -> **OAuth client ID**.
4.  Select **Web application** as the application type.
5.  Add an **Authorized redirect URI**:
    -   `http://localhost:3000/api/auth/callback/google`
6.  Click **Create**. Copy the **Client ID** and **Client Secret**.

### 5. Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
# next-auth
NEXTAUTH_URL="http://localhost:3000"
# Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your_nextauth_secret_here"

# Google OAuth Provider
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"

# Prisma (defaults to SQLite for local dev)
# No need to set DATABASE_URL if you are using the default SQLite setup
```

### 6. Set Up the Database

This project uses SQLite for local development by default.

1.  **Generate Prisma Client**: This reads your `schema.prisma` and generates the TypeScript types for the client.
    ```bash
    npx prisma generate
    ```

2.  **Run Database Migration**: This creates the SQLite database file (`dev.db`) and the necessary tables.
    ```bash
    npx prisma migrate dev --name init
    ```

### 7. Run the Development Server

```bash
npm run dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Deployment to Vercel

### 1. Set Up Vercel Postgres

1.  Create a new project on [Vercel](https://vercel.com/).
2.  Connect your Git repository.
3.  Go to the **Storage** tab in your Vercel project dashboard and create a new **Postgres** database.
4.  Connect the database to your project's `main` branch (or your production branch).
5.  Vercel will automatically provide the `DATABASE_URL` environment variable.

### 2. Update Prisma Schema for Production

Your `prisma/schema.prisma` is configured for SQLite by default. Prisma will automatically use the `DATABASE_URL` from Vercel's environment variables if it's present, so you don't need to change the schema file itself.

### 3. Configure Environment Variables on Vercel

In your Vercel project settings, add the following environment variables:

-   `NEXTAUTH_SECRET`
-   `GOOGLE_CLIENT_ID`
-   `GOOGLE_CLIENT_SECRET`

**Note**: `NEXTAUTH_URL` is set automatically by Vercel. `DATABASE_URL` is set automatically when you connect Vercel Postgres.

### 4. Update Google OAuth Redirect URI

In your Google Cloud Console, add the production URL to your OAuth client's **Authorized redirect URIs**:

-   `https://your-project-name.vercel.app/api/auth/callback/google`

### 5. Deploy

Push your code to the `main` branch. Vercel will automatically build and deploy your application. The `build` script in `package.json` (`next build`) will be run, which includes `prisma generate`.

---

## Testing the Application

1.  Navigate to `http://localhost:3000`. You should be redirected to `/login`.
2.  Click "Continue with Google" and complete the OAuth flow.
3.  After logging in, you should be on the home page (`/`).
4.  Submit a score using the form. After submission, you should be redirected to `/leaderboard`.
5.  The leaderboard should display the score you submitted.
6.  Wait 20 seconds, and the leaderboard data should automatically refresh.
7.  Click "Sign Out" from the user menu in the header to end your session.


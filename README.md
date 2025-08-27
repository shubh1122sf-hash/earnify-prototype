
# Next.js + NextAuth + Prisma: Production-Ready Leaderboard

This is a production-ready Next.js 14+ application with a leaderboard, user authentication via Google OAuth (NextAuth.js v4), and data persistence using Prisma.

## Required Environment Variables

Create a `.env.local` file in your project root. For Vercel, set these in **Project Settings → Environment Variables**.

| Variable | Description | Example (local) |
| :--- | :--- | :--- |
| `DATABASE_URL` | Your database connection string. | `file:./dev.db` (for SQLite) |
| `NEXTAUTH_URL`| The canonical URL of your app. | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | A random string for signing JWTs. | Generate one: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID. | `...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret. | `GOCSPX-...` |

### Google OAuth Setup

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2.  Create or select a project.
3.  Go to **Credentials → Create Credentials → OAuth client ID**.
4.  Select **Web application**.
5.  Add an **Authorized redirect URI**:
    *   For local development: `http://localhost:3000/api/auth/callback/google`
    *   For production: `https://your-domain.com/api/auth/callback/google`

## Local Development (SQLite)

1.  **Install dependencies:** `npm install`
2.  **Create your `.env.local` file:** Copy the contents of `.env` into a new file named `.env.local` and fill in your actual secrets.
    ```env
    # .env.local
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your_nextauth_secret_here"
    GOOGLE_CLIENT_ID="your_google_client_id_here"
    GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
    ```
3.  **Generate Prisma Client:** `npx prisma generate`
4.  **Create database and tables:** `npx prisma migrate dev --name init`
5.  **Run the app:** `npm run dev`

## Production Deployment (Vercel Postgres)

1.  **Connect Vercel Postgres:** In your Vercel project dashboard, go to the **Storage** tab and connect a Postgres database. Vercel will automatically add the `DATABASE_URL` environment variable.
2.  **Set other environment variables** in Vercel.
3.  **Run production migration:** Before deploying, or as part of your build process if configured, you may need to run `npx prisma migrate deploy`. Vercel's default build command will typically run `prisma generate`.

## Troubleshooting

*   **"Server error" on login**:
    *   Check that all environment variables are set correctly in Vercel.
    *   Enable debug logs by setting `NEXTAUTH_DEBUG=true` in Vercel and check the **Functions** logs for your deployment.
*   **Infinite redirect loop**: Your `middleware.ts` matcher might be incorrectly blocking the `/login` or `/api/auth` paths. The one in this project is configured correctly.
*   **Prisma Edge/Node.js Errors**: Prisma does not work in the Edge runtime. All API routes that use Prisma (`/api/auth`, `/api/score`, etc.) **must** have `export const runtime = "nodejs";` at the top.

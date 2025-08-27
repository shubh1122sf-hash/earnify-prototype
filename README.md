
# Next.js Trading Simulator

This is a Next.js 14+ application that provides a virtual stock and crypto trading simulation experience.

## Features

- **Virtual Trading:** Buy and sell stocks and cryptocurrencies with a virtual balance.
- **Dynamic Market:** Asset prices change in real-time based on a simulated market model.
- **Portfolio Tracking:** Monitor your holdings, portfolio value, and profit/loss.
- **Leaderboard:** Compete with other virtual traders.
- **Mentors:** Choose a mentor to receive tips and guidance based on different investment philosophies.

## Local Development

1.  **Install dependencies:** `npm install`
2.  **Run the app:** `npm run dev`

The application will be available at `http://localhost:3000`.

To enable Google sign-in locally, create a `.env.local` file in the root of the project with the following content:

```
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
NEXTAUTH_SECRET="ANY_RANDOM_STRING_FOR_A_SECRET"
NEXTAUTH_URL="http://localhost:3000"
```

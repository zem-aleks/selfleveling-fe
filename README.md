# Circus POC

## Development

### Requirements

- Node.js (>20)
- Vercel CLI (`npm i -g vercel`)

### Setup

1. Install dependencies with `npm install`.
2. Link the Vercel project with `vercel link`.
3. Pull environment variables from Vercel with `vercel env pull .env`.
4. Start the server with `npm run dev`.

### Deployment

- Vercel project: [circus-poc](https://vercel.com/fully/circus-poc)
- Production deployments will be automatically triggered by Vercel when pushing to the `main` branch.
- Preview deployments can be triggered by running `vercel`.

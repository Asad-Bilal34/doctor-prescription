# 🔧 CORS Fix - Railway Deployment

## Problem
CORS error blocking requests from Vercel to Railway backend.

## Solution Applied
Updated `backend/index.js` with proper CORS configuration:
- Allows Vercel origin: `https://doctor-prescription-six.vercel.app`
- Allows localhost for development
- Handles preflight OPTIONS requests
- Allows required headers and methods

## Deploy to Railway

### Option 1: Git Push (if Railway connected to GitHub)
```bash
cd backend
git add index.js
git commit -m "Fix CORS for Vercel frontend"
git push
```

### Option 2: Railway CLI
```bash
cd backend
railway up
```

### Option 3: Manual Redeploy
1. Go to Railway dashboard
2. Select your project
3. Click "Deploy" or trigger redeploy

## Verify Fix

After deployment, test:
1. Visit: https://doctor-prescription-six.vercel.app/login
2. Try to login
3. Should work without CORS error

## Environment Variables on Railway

Make sure these are set:
```
PORT=4001
NODE_ENV=production
DATABASE_URL=<your-postgres-url>
SESSION_SECRET=<random-secret>
INIT_ADMIN_EMAIL=soomro@gmail.com
INIT_ADMIN_PASSWORD=Admin123!@#
```

## Test Backend Health

```bash
curl https://doctor-prescription-production-9d26.up.railway.app/api/health
```

Should return:
```json
{"success":true,"message":"Server is running","timestamp":"..."}
```

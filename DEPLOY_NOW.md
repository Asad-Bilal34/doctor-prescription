# 🚨 URGENT: Deploy Backend to Railway

## The Problem
Your Railway backend still has the OLD code without CORS fix. You MUST deploy the updated code.

## ✅ Solution: Deploy Updated Backend

### Step 1: Check Railway Connection

Go to Railway dashboard: https://railway.app/dashboard

Find your project: `doctor-prescription-production-9d26`

### Step 2: Deploy Options

#### Option A: GitHub Auto-Deploy (Recommended)

If Railway is connected to your GitHub repo:

```bash
# From project root
git add .
git commit -m "Fix CORS for production"
git push origin main
```

Railway will auto-deploy in 2-3 minutes.

#### Option B: Railway CLI

```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
cd backend
railway up
```

#### Option C: Manual File Upload

1. Go to Railway dashboard
2. Click your backend service
3. Go to "Settings" → "Source"
4. Click "Redeploy" or upload files manually

### Step 3: Verify Deployment

After deployment, check logs in Railway dashboard:
- Should see: "DocScript Backend Server running on port 4001"
- No errors about CORS

### Step 4: Test CORS

Open browser console and run:
```javascript
fetch('https://doctor-prescription-production-9d26.up.railway.app/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should return: `{success: true, message: "Server is running", ...}`

### Step 5: Test Login

Now try logging in at: https://doctor-prescription-six.vercel.app/login

## 🔍 If Still Not Working

Check Railway logs:
1. Go to Railway dashboard
2. Click your service
3. Click "Deployments"
4. Click latest deployment
5. Check logs for errors

## Environment Variables (Must Be Set)

In Railway dashboard → Settings → Variables:

```
PORT=4001
NODE_ENV=production
DATABASE_URL=<your-railway-postgres-url>
SESSION_SECRET=<random-secret-key>
INIT_ADMIN_EMAIL=soomro@gmail.com
INIT_ADMIN_PASSWORD=Admin123!@#
```

## Quick Test Commands

```bash
# Test health endpoint
curl https://doctor-prescription-production-9d26.up.railway.app/api/health

# Test CORS headers
curl -I -X OPTIONS https://doctor-prescription-production-9d26.up.railway.app/api/auth/login
```

Should see `Access-Control-Allow-Origin: *` in response headers.

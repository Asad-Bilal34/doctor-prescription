# 🚨 COMPLETE FIX - Frontend + Backend

## Problem Summary
1. ❌ CORS error - Backend needs update
2. ❌ 404 errors - Vercel build issue  
3. ❌ Wrong Vercel URL - Preview instead of production

---

## STEP 1: Fix Backend CORS (Railway)

### Option A: GitHub Deploy
```bash
cd d:\dr-project
git add backend/index.js
git commit -m "Fix CORS for production"
git push origin main
```

### Option B: Railway CLI
```bash
npm install -g @railway/cli
railway login
cd d:\dr-project\backend
railway up
```

### Option C: Manual Railway Dashboard
1. Go to: https://railway.app/dashboard
2. Select: doctor-prescription project
3. Click: Settings → Redeploy

---

## STEP 2: Fix Frontend (Vercel)

### Deploy to Production (Not Preview)

```bash
cd d:\dr-project
git add .
git commit -m "Fix build and CORS"
git push origin main
```

### Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select: doctor-prescription project
3. Go to: Settings → Domains
4. Make sure `doctor-prescription-six.vercel.app` is primary domain
5. Redeploy from: Deployments → Latest → Redeploy

---

## STEP 3: Verify Environment Variables

### Vercel Environment Variables
```
VITE_API_URL=https://doctor-prescription-production-9d26.up.railway.app
```

### Railway Environment Variables
```
PORT=4001
NODE_ENV=production
DATABASE_URL=<your-postgres-url>
SESSION_SECRET=<random-secret>
INIT_ADMIN_EMAIL=soomro@gmail.com
INIT_ADMIN_PASSWORD=Admin123!@#
```

---

## STEP 4: Test After Deployment

### Test Backend
```bash
curl https://doctor-prescription-production-9d26.up.railway.app/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

### Test Frontend
Visit: https://doctor-prescription-six.vercel.app/login

Should load without 404 errors.

---

## Quick Checklist

- [ ] Backend code updated on Railway
- [ ] Frontend code updated on Vercel
- [ ] Using production URL (not preview)
- [ ] Environment variables set correctly
- [ ] Both services showing "Active/Online"

---

## If Still Not Working

### Check Railway Logs
1. Railway Dashboard → Deployments → Latest
2. Look for: "DocScript Backend Server running on port 4001"
3. No CORS errors in logs

### Check Vercel Logs
1. Vercel Dashboard → Deployments → Latest
2. Build should succeed
3. No 404 errors

### Test CORS Manually
Open browser console on https://doctor-prescription-six.vercel.app:
```javascript
fetch('https://doctor-prescription-production-9d26.up.railway.app/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should work without CORS error.

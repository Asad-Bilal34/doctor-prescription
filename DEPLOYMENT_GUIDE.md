# 🚀 Deployment Guide - Railway + Vercel

## 📋 Prerequisites
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- GitHub repository

---

## 🔧 Part 1: Backend Deployment (Railway)

### Step 1: Create PostgreSQL Database
1. Go to Railway Dashboard
2. Click "New Project" → "Provision PostgreSQL"
3. Copy the `DATABASE_URL` connection string

### Step 2: Deploy Backend
1. Click "New" → "GitHub Repo"
2. Select your repository
3. Choose `backend` folder as root directory

### Step 3: Set Environment Variables
Go to Variables tab and add:
```
PORT=4001
NODE_ENV=production
DATABASE_URL=<your-postgresql-url-from-step-1>
SESSION_SECRET=<generate-random-secret>
INIT_ADMIN_EMAIL=soomro@gmail.com
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Configure Build
- Build Command: `npm install`
- Start Command: `npm run start:prod`

### Step 5: Get Backend URL
- Copy your Railway URL: `https://your-backend.up.railway.app`

---

## 🌐 Part 2: Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Root Directory: `./` (keep default)

### Step 2: Set Environment Variables
Add in Vercel → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend.up.railway.app
```

### Step 3: Deploy
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Click "Deploy"

---

## ✅ Part 3: Connect Frontend & Backend

### Update Backend CORS
1. Go to Railway → Backend → Variables
2. Update `FRONTEND_URL` with your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```

### Update Frontend API URL
1. Go to Vercel → Settings → Environment Variables
2. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```

### Redeploy Both
1. Railway: Will auto-redeploy on variable change
2. Vercel: Go to Deployments → Redeploy

---

## 🧪 Testing

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Register a new account
3. Login with admin email: `soomro@gmail.com`
4. Create a prescription
5. Test all features

---

## 🔒 Security Checklist

- ✅ Change `SESSION_SECRET` to random string
- ✅ Update `INIT_ADMIN_EMAIL` to your email
- ✅ Set strong admin password
- ✅ Enable HTTPS (automatic on Railway/Vercel)
- ✅ Set correct CORS origins

---

## 📝 Important Notes

1. **Database**: Railway PostgreSQL is used (not SQLite)
2. **First User**: User with `INIT_ADMIN_EMAIL` becomes ADMIN
3. **Migrations**: Run automatically on Railway deploy
4. **Logs**: Check Railway logs for backend errors
5. **Build**: Vercel builds frontend automatically

---

## 🐛 Troubleshooting

### Backend Issues
- Check Railway logs
- Verify DATABASE_URL is correct
- Ensure migrations ran successfully

### Frontend Issues
- Check Vercel deployment logs
- Verify VITE_API_URL is correct
- Clear browser cache

### Connection Issues
- Verify CORS settings
- Check both URLs are HTTPS
- Test API endpoint: `https://your-backend.up.railway.app/api/health`

---

## 🎉 Done!

Your app is now live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.up.railway.app`

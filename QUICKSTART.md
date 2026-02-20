# 🚀 DocScript — Quick Start (Copy & Paste)

## Prerequisites
- Node.js 18+ installed
- A free Supabase account (takes 2 minutes to sign up)

---

## TLDR (5 minutes to live app)

### 1️⃣ Create Free Database

Go to **https://supabase.com** → Sign up → Create project → Wait 2 minutes

### 2️⃣ Get Connection String

In Supabase dashboard:
- **Settings** → **Database**
- Copy the **"URI"** connection string (replace `[YOUR-PASSWORD]`)

### 3️⃣ Configure Backend

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXX.supabase.co:5432/postgres
PORT=4000
SESSION_SECRET=my-secret-key
INIT_ADMIN_EMAIL=admin@example.com
INIT_ADMIN_PASSWORD=Admin123!@#
NODE_ENV=development
```

### 4️⃣ Run Setup

```bash
cd backend
node scripts/setup-backend.js
```

### 5️⃣ Start Servers (2 terminals)

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd ..
npm run dev
```

Open **http://localhost:5173**

---

## Registration Test

1. Click **"Register here"**
2. Email: `admin@example.com`
3. Password: `Admin123!@#`
4. This email auto-becomes **ADMIN**
5. You now have full access!

---

## Other users

Register with any email/password → You get **USER** role (create prescriptions only)

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| "relation 'User' does not exist" | Run: `cd backend && npx prisma db push` |
| "Cannot connect to database" | Check DATABASE_URL in backend/.env |
| "Cannot find module '@prisma/client'" | Run: `cd backend && npm install` |
| Port already in use | Edit `backend/.env` PORT or `root/.env` VITE_API_URL |

---

**Done!** Your SaaS is live. 🎉

Next: Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production.

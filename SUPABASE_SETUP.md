# DocScript — Supabase Quick Setup (5 minutes)

This is the easiest way to get registration working. Supabase provides a **free PostgreSQL database** in the cloud. No credit card needed.

---

## Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click **"Start your project"** → Sign up with GitHub or email
3. Create a new project:
   - **Project name:** `docscript`
   - **Database password:** Choose something (save it)
   - **Region:** Pick closest to you
4. Wait for project to initialize (~2 minutes)

---

## Step 2: Get Your Database Connection String (1 minute)

1. In Supabase dashboard, go to **Settings** → **Database**
2. Under "Connection string", select **"URI"** tab
3. Copy the full connection string (looks like: `postgresql://postgres:PASSWORD@...`)
4. **Replace `[YOUR-PASSWORD]` with your database password**

---

## Step 3: Update Backend Configuration (1 minute)

Edit `backend/.env`:

```env
PORT=4000
NODE_ENV=development

# Paste your Supabase connection string here:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.XXXXX.supabase.co:5432/postgres

SESSION_SECRET=my-super-secret-jwt-key-change-this-in-production
INIT_ADMIN_EMAIL=admin@example.com
INIT_ADMIN_PASSWORD=Admin123!@#

API_BASE_URL=http://localhost:4000
FRONTEND_URL=http://localhost:5173
```

---

## Step 4: Run Database Migrations (1 minute)

From `backend/` folder, run:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

If `migrate deploy` fails, try:
```bash
npx prisma db push
```

---

## Step 5: Start Backend & Frontend

**Terminal 1** (Backend):
```bash
cd backend
npm run dev
```

**Terminal 2** (Frontend, from project root):
```bash
npm run dev
```

Open http://localhost:5173 → **Register** → Use email `admin@example.com` (becomes ADMIN automatically)

---

## Troubleshooting

**"relation 'User' does not exist"**
→ Run: `npx prisma db push`

**"Cannot connect to database"**
→ Check DATABASE_URL is correct (paste from Supabase → Settings → Database → URI)

**"migrate deploy fails"**
→ Use `npx prisma db push` instead

---

**That's it!** Your project is now live with a real PostgreSQL database. ✅

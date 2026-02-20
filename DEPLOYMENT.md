# DocScript — Complete Setup & Deployment Guide

This is a **doctor prescription SaaS application** with:
- **Backend**: Node.js + Express + PostgreSQL + Prisma + JWT auth
- **Frontend**: React + Vite + TypeScript with role-based access (Admin/User)
- **Auth**: Register/Login with JWT tokens
- **Roles**: 
  - **ADMIN**: Full access (dashboard, patient history, settings)
  - **USER**: Create new prescriptions only

---

## Quick Start (Local Development)

### Prerequisites
- **Node.js 18+** and **npm**
- **Docker Desktop** (for local Postgres) *or* a remote Postgres database URL

### Step 1: Install all dependencies

```bash
npm run setup
```

This installs root and backend dependencies and creates `.env` files from examples.

### Step 2: Start PostgreSQL

If using Docker:
```bash
cd backend
docker compose up -d
```

If using a remote Postgres (e.g., Supabase, RDS), skip this and set `DATABASE_URL` in `backend/.env` directly in Step 3.

### Step 3: Configure backend environment

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/docscript?schema=public
PORT=4000
SESSION_SECRET=your-super-secret-key-change-this
INIT_ADMIN_EMAIL=admin@example.com
INIT_ADMIN_PASSWORD=strongpassword
```

### Step 4: Initialize database (generate Prisma client + run migrations)

```bash
cd backend
node scripts/setup-backend.js
```

This will:
- Start Postgres (if Docker)
- Install npm dependencies
- Install and generate Prisma client
- Run migrations to create tables

If this script fails, run manually:
```bash
cd backend
npm install
npm install prisma@5.12.0 --save-dev
npx prisma generate
npx prisma migrate dev --name init
# or if migrate fails:
# npx prisma db push
```

### Step 5: Start frontend and backend

**Option A: Two terminals (recommended)**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
# from project root
npm run dev
```

Backend will run on `http://localhost:4000`  
Frontend will run on `http://localhost:5173`

**Option B: Single terminal (both servers)**

```bash
npm run dev:all
```

### Step 6: Register and Login

1. Open `http://localhost:5173` in your browser
2. Click "Register here" and create an account
3. Use the email/password from Step 3 (`INIT_ADMIN_EMAIL`, `INIT_ADMIN_PASSWORD`) to auto-create an **ADMIN** account
4. Other registered users will be **USER** role (can only create prescriptions)

---

## Production Deployment

### Option 1: Railway (Recommended for beginners)

1. **Prepare repository** (push to GitHub)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/docscript.git
   git push -u origin main
   ```

2. **Create Railway account** at https://railway.app

3. **Deploy backend**
   - Create new project → Deploy from GitHub repo
   - Select backend folder
   - Railway auto-detects Node.js
   - Add PostgreSQL plugin
   - Set environment variables in Railway dashboard:
     ```
     DATABASE_URL=<auto-filled by Railway>
     PORT=4000
     SESSION_SECRET=<generate-secure-random-string>
     INIT_ADMIN_EMAIL=admin@yourdomain.com
     INIT_ADMIN_PASSWORD=<secure-password>
     NODE_ENV=production
     ```
   - Deploy

4. **Deploy frontend** (same GitHub repo, frontend folder)
   - Select frontend folder
   - Set build command: `npm run build`
   - Set start command: `npx serve -s dist -l 3000`
   - Add environment variable:
     ```
     VITE_API_URL=<railway-backend-url>
     ```
   - Deploy

5. **Run database migrations** (one-time, after backend is live)
   ```bash
   # From local machine after deploying backend
   cd backend
   export DATABASE_URL="postgresql://user:pass@hostname/dbname"
   npx prisma migrate deploy
   ```

---

### Option 2: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
1. Push repo to GitHub
2. Import repo at https://vercel.com
3. Set build command: `npm run build`
4. Set environment variable: `VITE_API_URL=<your-render-backend-url>`
5. Deploy

**Backend on Render:**
1. Create PostgreSQL database on Render
2. Create Web Service on Render from GitHub repo
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && node index.js`
5. Set environment variables (see Railway section above)
6. Deploy

---

### Option 3: AWS (ECS + RDS)

Requires more setup but scales very well. Use AWS CLI or AWS Console to:
1. Provision RDS PostgreSQL
2. Create ECS task definitions for backend (Node.js image)
3. Use CloudFront + S3 for frontend (or use Vercel for frontend, RDS + ECS for backend)
4. Set `DATABASE_URL` from RDS endpoint in ECS task environment

---

## Database

### Schema Overview
- **Clinic**: clinic info (name, doctor name, address, etc.)
- **User**: users with roles (ADMIN / USER), passwords hashed with bcrypt
- **Patient**: patient records linked to clinics via `clinicId`

### Running Migrations

Local:
```bash
npx prisma migrate dev --name <name>
```

Production (after deployment):
```bash
DATABASE_URL=<prod-url> npx prisma migrate deploy
```

### Viewing Database (Prisma Studio)

```bash
npx prisma studio
```

Opens a web UI to browse and edit database directly.

---

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
  ```json
  { "email": "user@example.com", "password": "pass", "name": "John" }
  ```
- `POST /api/auth/login` — Login user
  ```json
  { "email": "user@example.com", "password": "pass" }
  ```
  Returns: `{ "user": { "id", "email", "role" }, "token": "jwt..." }`

### Protected Routes (requires `Authorization: Bearer <token>` header)

**ADMIN only:**
- `GET /api/patients` — List all patients
- `GET /api/patients/:id` — Get patient details
- `PUT /api/patients/:id` — Edit patient
- `DELETE /api/patients/:id` — Delete patient
- `GET /api/patients/search/:query` — Search patients
- `GET /api/config` — Get clinic settings
- `PUT /api/config` — Update clinic settings
- `GET /api/stats` — Get dashboard stats

**ADMIN + USER:**
- `POST /api/patients` — Create new patient/prescription *(USER can only do this)*

### Health Check
- `GET /api/health` — Server status

---

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://...
PORT=4000
SESSION_SECRET=very-secret-key
INIT_ADMIN_EMAIL=admin@example.com
INIT_ADMIN_PASSWORD=initialpassword
NODE_ENV=development
```

### Frontend (root `.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## Troubleshooting

### `prisma generate` fails on Windows
**Solution:** Run from `backend/` directory:
```bash
cd backend
npx prisma generate --schema=prisma/schema.prisma
```

### `Docker not found` error
**Solution:** Install Docker Desktop or set a remote `DATABASE_URL` in `backend/.env`.

### Login/Register errors (401/403)
- Ensure `SESSION_SECRET` is set in `backend/.env`
- Ensure JWT token is included in `Authorization: Bearer <token>` header
- Check token expiration (default 7 days)

### CORS errors
- Ensure `VITE_API_URL` matches your backend URL
- Check backend `cors()` middleware is enabled (it is, by default)

### Migrations fail
Try `npx prisma db push` instead of `npx prisma migrate dev`.

---

## Multi-Tenant Future Expansion

Currently, the app uses a single clinic seeded at startup. To expand to multi-tenant (multiple clinics/users per clinic):

1. Add clinic registration flow (admin creates clinic, invites users)
2. Add middleware to enforce `clinicId` from JWT token
3. Add `clinicId` to all patient/config queries (already partially done)
4. Use row-level security (RLS) in Postgres for extra safety

---

## Need Help?

- Check logs: `docker logs <container-id>` (for docker containers)
- View database: `npx prisma studio`
- Backend logs: look at terminal where `npm run dev` is running
- Frontend console: open browser DevTools (F12)

---

**Ready to deploy!** Choose an option from the Production Deployment section and follow the steps.

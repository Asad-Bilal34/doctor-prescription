import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;

// Prisma
const prisma = new PrismaClient();
let CLINIC_ID = process.env.CLINIC_ID || null;

const SESSION_SECRET = process.env.SESSION_SECRET || 'change_this_secret';

function generateToken(user) {
  const payload = { userId: user.id, role: user.role, clinicId: user.clinicId };
  return jwt.sign(payload, SESSION_SECRET, { expiresIn: '7d' });
}

async function authenticateToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Missing token' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
}

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(403).json({ success: false, error: 'No role present' });
    if (allowedRoles.includes(role)) return next();
    return res.status(403).json({ success: false, error: 'Forbidden' });
  };
}

// Middleware
app.use(cors());
app.use(express.json());

// Default clinic config used to seed DB if empty
const defaultClinicConfig = {
  name: 'REHMAN MEDICAL CENTER',
  drNameEn: 'Dr. Muhammad Ahmed',
  drDegreesEn: 'MBBS, FCPS (Medicine)\nGeneral Physician & Consultant',
  drNameUr: 'ڈاکٹر محمد احمد',
  drDegreesUr: 'ایم بی بی ایس، ایف سی پی ایس\nماہر امراضِ جگر و معدہ',
  clinicAddress: 'Plot 45-C, Medical Lane, Phase 5, Karachi',
  clinicContact: '021-34567890 / 0300-1234567',
  logo: null
};

// =========================
// PATIENT ROUTES
// =========================

app.get('/api/patients', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const data = await prisma.patient.findMany({
      where: { clinicId: CLINIC_ID },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data, count: data.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/patients/:id', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: req.params.id } });
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });
    res.json({ success: true, data: patient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/patients', authenticateToken, authorizeRole('ADMIN', 'USER'), async (req, res) => {
  try {
    const { name, mobile, date, age, sex, complaints, diseases, advice, treatment } = req.body;

    if (!name || !mobile || !date) {
      return res.status(400).json({ success: false, error: 'Patient Name, Mobile, and Date are mandatory.' });
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: age || '',
        sex: sex || 'Male',
        mobile,
        date,
        complaints: complaints || '',
        diseases: diseases || { hypertension: false, diabetesMellitus: false, hepatitisB: false, hepatitisC: false },
        advice: advice || '',
        treatment: treatment || '',
        clinicId: CLINIC_ID
      }
    });

    res.status(201).json({ success: true, data: newPatient });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================
// AUTH ROUTES
// =========================

// Register - creates a USER by default; first user can be ADMIN via init env
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ success: false, error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);

    // If no users exist and INIT_ADMIN_EMAIL matches, create admin (auto-approved)
    let role = 'USER';
    let approved = false;
    const usersCount = await prisma.user.count();
    if (usersCount === 0 && process.env.INIT_ADMIN_EMAIL && process.env.INIT_ADMIN_EMAIL === email) {
      role = 'ADMIN';
      approved = true;
    }

    const user = await prisma.user.create({ data: { email, password: hashed, name, role, approved } });
    const token = generateToken(user);
    res.status(201).json({ success: true, data: { user: { id: user.id, email: user.email, role: user.role, approved: user.approved }, token } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success: false, error: 'Invalid credentials' });

    if (!user.approved) {
      // Allow login but indicate not approved; token still issued but frontend should restrict access to prescription page
      const token = generateToken(user);
      res.json({ success: true, data: { user: { id: user.id, email: user.email, role: user.role, approved: user.approved }, token } });
    } else {
      const token = generateToken(user);
      res.json({ success: true, data: { user: { id: user.id, email: user.email, role: user.role, approved: user.approved }, token } });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Return current user info
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: { id: user.id, email: user.email, role: user.role, approved: user.approved } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all users (ADMIN only)
app.get('/api/users', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, approved: true, createdAt: true }
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete user (ADMIN only)
app.delete('/api/users/:id', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const deleted = await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'User deleted', data: { id: deleted.id, email: deleted.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Make user an ADMIN (ADMIN only)
app.patch('/api/users/:id/make-admin', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { role: 'ADMIN', approved: true }
    });
    res.json({ success: true, message: 'User promoted to ADMIN', data: { id: updated.id, email: updated.email, role: updated.role } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Approve user registration (ADMIN only)
app.patch('/api/users/:id/approve', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { approved: true }
    });
    res.json({ success: true, message: 'User approved', data: { id: updated.id, email: updated.email, approved: updated.approved } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create new ADMIN user directly (ADMIN only)
app.post('/api/users/create-admin', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ success: false, error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role: 'ADMIN', approved: true }
    });

    const token = generateToken(user);
    res.status(201).json({ success: true, data: { user: { id: user.id, email: user.email, role: user.role }, token } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/patients/:id', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const { name, mobile, date, age, sex, complaints, diseases, advice, treatment } = req.body;
    if (!name || !mobile || !date) {
      return res.status(400).json({ success: false, error: 'Patient Name, Mobile, and Date are mandatory.' });
    }

    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: {
        name,
        age: age || '',
        sex: sex || 'Male',
        mobile,
        date,
        complaints: complaints || '',
        diseases: diseases || undefined,
        advice: advice || '',
        treatment: treatment || '',
        updatedAt: new Date()
      }
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/patients/:id', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const deleted = await prisma.patient.delete({ where: { id: req.params.id } });
    res.json({ success: true, data: deleted, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/patients/search/:query', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const q = req.params.query;
    const results = await prisma.patient.findMany({
      where: {
        clinicId: CLINIC_ID,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { mobile: { contains: q } }
        ]
      }
    });
    res.json({ success: true, data: results, count: results.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================
// CLINIC CONFIG ROUTES
// =========================

app.get('/api/config', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const clinic = await prisma.clinic.findUnique({ where: { id: CLINIC_ID } });
    res.json({ success: true, data: clinic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/config', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const updates = req.body;
    const updated = await prisma.clinic.update({ where: { id: CLINIC_ID }, data: updates });
    res.json({ success: true, data: updated, message: 'Config updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================
// STATS ROUTES
// =========================

app.get('/api/stats', authenticateToken, authorizeRole('ADMIN'), async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const totalPatients = await prisma.patient.count({ where: { clinicId: CLINIC_ID } });
    const visitsToday = await prisma.patient.count({ where: { clinicId: CLINIC_ID, date: today } });
    const recentPatients = await prisma.patient.findMany({ where: { clinicId: CLINIC_ID }, orderBy: { createdAt: 'desc' }, take: 5 });
    const stats = { totalPatients, visitsToday, clinicStatus: 'Online', recentPatients };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =========================
// HEALTH CHECK
// =========================

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// =========================
// ERROR HANDLING
// =========================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Initialize DB and start server
(async () => {
  try {
    // Ensure a clinic exists (seed default clinic if none)
    if (!CLINIC_ID) {
      const existing = await prisma.clinic.findFirst();
      if (existing) {
        CLINIC_ID = existing.id;
        console.log('Using existing clinic:', CLINIC_ID);
      } else {
        const created = await prisma.clinic.create({ data: defaultClinicConfig });
        CLINIC_ID = created.id;
        console.log('Created default clinic:', CLINIC_ID);
      }
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`DocScript Backend Server running on port ${PORT}`);
      console.log(`${new Date().toISOString()} - Server started`);
    });
  } catch (err) {
    console.error('Failed to initialize database or start server', err);
    process.exit(1);
  }
})();

// Helpful global error handlers to capture startup/runtime failures in deployment logs
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1);
});

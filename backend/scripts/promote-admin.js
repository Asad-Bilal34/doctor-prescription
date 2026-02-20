import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

async function promote(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }
    if (user.role === 'ADMIN') {
      if (user.approved) {
        console.log('User is already ADMIN and approved:', email);
        process.exit(0);
      } else {
        const updated = await prisma.user.update({ where: { email }, data: { approved: true } });
        console.log('User was ADMIN; set approved=true for:', updated.email);
        process.exit(0);
      }
    }

    const updated = await prisma.user.update({ where: { email }, data: { role: 'ADMIN', approved: true } });
    console.log('Promoted user to ADMIN (approved):', updated.email, 'id:', updated.id);
    process.exit(0);
  } catch (err) {
    console.error('Failed to promote user:', err.message || err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
if (!email) {
  console.error('Usage: node promote-admin.js <email>');
  process.exit(1);
}

promote(email);

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

function run(cmd, ignoreError = false) {
  console.log('> ' + cmd)
  try {
    execSync(cmd, { stdio: 'inherit' })
  } catch (err) {
    if (!ignoreError) throw err
  }
}

console.log('\n🚀 DocScript Backend Setup\n')

try {
  console.log('📦 Installing dependencies...')
  run('npm install')

  console.log('\n🔧 Installing Prisma CLI...')
  run('npm install prisma@5.12.0 --save-dev')

  console.log('\n⚙️  Generating Prisma client...')
  run('npx prisma generate')

  console.log('\n🗄️  Creating SQLite database...')
  run('npx prisma migrate dev --name init')

  console.log('\n✅ Backend setup complete!\n')
  console.log('📝 Next steps:')
  console.log('   cd backend')
  console.log('   npm run dev\n')
  console.log('✅ Frontend setup:')
  console.log('   npm run dev\n')
} catch (err) {
  console.error('\n❌ Setup failed!')
  console.error('Error:', err.message)
  process.exit(1)
}

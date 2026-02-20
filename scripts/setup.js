import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

function run(cmd) {
  console.log('> ' + cmd)
  execSync(cmd, { stdio: 'inherit' })
}

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const backend = path.join(root, 'backend')

try {
  console.log('Installing root dependencies...')
  run('npm install')

  console.log('Installing backend dependencies...')
  run('npm --prefix backend install')

  // Copy example env files if real ones don't exist
  const rootExample = path.join(root, '.env.example')
  const rootEnv = path.join(root, '.env')
  if (fs.existsSync(rootExample) && !fs.existsSync(rootEnv)) {
    fs.copyFileSync(rootExample, rootEnv)
    console.log('Created .env from .env.example (root)')
  }

  const backendExample = path.join(backend, '.env.example')
  const backendEnv = path.join(backend, '.env')
  if (fs.existsSync(backendExample) && !fs.existsSync(backendEnv)) {
    fs.copyFileSync(backendExample, backendEnv)
    console.log('Created .env from .env.example (backend)')
  }

  console.log('\nSetup complete. To start both servers run:')
  console.log('  npm run dev:all')
} catch (err) {
  console.error(err)
  process.exit(1)
}

import { spawn } from 'child_process';
import path from 'path';

console.log('🚀 Starting Hindustan Projects Empanelment Portal...');

// 1. Start Node.js VPS Backend Server (Port 5000)
console.log('📡 Starting VPS Backend Server on Port 5000...');
const server = spawn('node', ['backend/server.js'], { stdio: 'inherit', shell: true });

// 2. Start Vite Frontend Server (Port 5173)
console.log('💻 Starting Vite Frontend App on Port 5173...');
const vite = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server processes...');
  server.kill();
  vite.kill();
  process.exit();
});

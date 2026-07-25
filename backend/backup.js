const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'empanelment.db');
const backupDir = path.join(__dirname, 'backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

if (fs.existsSync(dbPath)) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `empanelment_backup_${timestamp}.db`);
  fs.copyFileSync(dbPath, backupPath);
  console.log(`✅ [Hindustan Projects DB Guard] Backup created successfully at: ${backupPath}`);
} else {
  console.log('ℹ️ [Hindustan Projects DB Guard] SQLite Database empanelment.db will be created upon first vendor submission.');
}

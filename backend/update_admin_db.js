const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'empanelment.db');
const db = new sqlite3.Database(dbPath);

console.log('Connecting to DB at:', dbPath);

db.serialize(() => {
  db.all('SELECT * FROM site_config', [], (err, rows) => {
    console.log('Current site_config rows:', rows);
  });

  db.run(
    `INSERT INTO site_config (key, value) VALUES ('admin_password', 'Hipro@7764'), ('admin_email', 'hindustanprojects.in@gmail.com') ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [],
    (err) => {
      if (err) {
        console.error('Error updating site_config:', err);
      } else {
        console.log('✅ Successfully updated site_config in empanelment.db with admin_password = Hipro@7764 and admin_email = hindustanprojects.in@gmail.com');
      }
    }
  );
});

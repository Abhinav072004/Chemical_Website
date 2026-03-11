import bcrypt from 'bcryptjs';
import { db, initSchema } from './db.js';

initSchema();

const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
const hash = bcrypt.hashSync(defaultPassword, 10);

db.prepare(
  "INSERT OR IGNORE INTO users (id, email, password_hash) VALUES (1, 'admin@iiti.ac.in', ?)"
).run(hash);

const facultyCount = db.prepare('SELECT COUNT(*) as c FROM faculty').get().c;
if (facultyCount === 0) {
  db.prepare(`
    INSERT INTO faculty (name, position, education, research, email, phone, office, home_page, publications, experience, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Dr. Sample Professor',
    'Assistant Professor',
    'Ph.D. from IIT Delhi',
    JSON.stringify(['Process Systems Engineering', 'Optimization']),
    'sample@iiti.ac.in',
    '+91-731-2438 700 (Ext. 5001)',
    'POD 1C 501',
    'https://iiti.ac.in',
    '10',
    '5+ years',
    '/rajans.JPG',
    'core'
  );
}

const eventsCount = db.prepare('SELECT COUNT(*) as c FROM events').get().c;
if (eventsCount === 0) {
  db.prepare(`
    INSERT INTO events (title, date, time, location, type, description, registrations, max_capacity, status, color, event_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'upcoming')
  `).run(
    'Sample Conference',
    'March 15-17, 2025',
    '9:00 AM - 5:00 PM',
    'IIT Indore Campus',
    'Conference',
    'Join us for cutting-edge presentations and networking.',
    0,
    500,
    'Registration Open',
    'bg-blue-500'
  );
}

console.log('Seed done. Admin login: admin@iiti.ac.in /', defaultPassword);

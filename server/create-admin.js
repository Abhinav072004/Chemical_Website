import bcrypt from 'bcryptjs';
import { db } from './db.js';

const email = 'che230008002@iiti.ac.in'; 
const password = 'admin123'; 

console.log('Creating admin user...');

// 1. Hash the password (CRITICAL: Never save plain text passwords)
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

try {
  // 2. Insert into DB (This is the part auth.js doesn't have)
  const insert = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
  insert.run(email, hash);
  
  console.log(`✅ Success! User created: ${email}`);
  console.log('You can now log in at http://localhost:5173/admin/login');
} catch (error) {
  if (error.message.includes('UNIQUE constraint')) {
    console.log('⚠️  User already exists. You can just login.');
  } else {
    console.error('❌ Error:', error.message);
  }
}

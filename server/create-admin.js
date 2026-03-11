import bcrypt from 'bcryptjs';
import { db } from './db.js';
import 'dotenv/config'; // <-- This magical line loads your .env file!

// Pull from the hidden .env file instead of typing it here
const email = process.env.ADMIN_EMAIL; 
const password = process.env.ADMIN_PASSWORD; 

if (!email || !password) {
  console.error('❌ Error: Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file!');
  process.exit(1);
}

console.log('Creating admin user...');

// 1. Hash the password
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

try {
  // 2. Insert into DB
  const insert = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
  insert.run(email, hash);
  
  console.log(`✅ Success! User created: ${email}`);
} catch (error) {
  if (error.message.includes('UNIQUE constraint')) {
    console.log('⚠️ User already exists. You can just login.');
  } else {
    console.error('❌ Error:', error.message);
  }
}
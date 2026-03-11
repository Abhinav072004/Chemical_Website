import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initSchema } from './db.js';
import authRoutes from './routes/auth.js';
import facultyRoutes from './routes/faculty.js';
import { adminRouter as facultyAdmin } from './routes/faculty.js';
import eventsRoutes from './routes/events.js';
import { adminRouter as eventsAdmin } from './routes/events.js';
import studentRouter, { adminStudentRouter as studentAdmin } from './routes/student.js';

// --- ADDED NEWS ROUTE ---
import newsRoutes from './routes/news.js';

initSchema();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const uploadsPath = join(__dirname, '..', 'public', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use('/api/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/admin/faculty', facultyAdmin);
app.use('/api/events', eventsRoutes);
app.use('/api/admin/events', eventsAdmin);
app.use('/api/student', studentRouter);
app.use('/api/admin/student', studentAdmin);

// --- ADDED NEWS ENDPOINT ---
app.use('/api/news', newsRoutes);

const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
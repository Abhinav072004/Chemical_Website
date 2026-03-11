import { Router } from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

// Helper to format database rows for the frontend
function rowToStudent(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    designation: row.designation,
    homePageURL: row.home_page_url,
    email: row.email,
    phone: row.phone,
    addressLocation: row.address_location,
    role: row.role,
    order: row.sort_order,
    image: row.image,
  };
}

// GET: Fetch all students
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM students ORDER BY sort_order ASC, id ASC').all();
    res.json(rows.map(rowToStudent));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const adminStudentRouter = Router({ mergeParams: true });
adminStudentRouter.use(authMiddleware);

// POST: Create a new student (Handles Image Upload)
adminStudentRouter.post('/', upload.single('imageFile'), (req, res) => {
  const body = req.body || {};
  const imagePath = req.file ? `/uploads/${req.file.filename}` : (body.image || '');

  try {
    const stmt = db.prepare(`
      INSERT INTO students (name, designation, home_page_url, email, phone, address_location, role, sort_order, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.name || '',
      body.designation || '',
      body.homePageURL || '',
      body.email || '',
      body.phone || '',
      body.addressLocation || '',
      body.role || 'UG',
      body.order ? Number(body.order) : 1,
      imagePath
    );
    const row = db.prepare('SELECT * FROM students WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(rowToStudent(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Update an existing student
adminStudentRouter.put('/:id', upload.single('imageFile'), (req, res) => {
  const id = Number(req.params.id);
  const body = req.body || {};

  try {
    const existing = db.prepare('SELECT id, image FROM students WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    let imagePath = req.file ? `/uploads/${req.file.filename}` : body.image;

    const stmt = db.prepare(`
      UPDATE students
      SET name = ?, designation = ?, home_page_url = ?, email = ?, phone = ?, address_location = ?, role = ?, sort_order = ?, image = ?
      WHERE id = ?
    `);
    stmt.run(
      body.name, body.designation, body.homePageURL, body.email, body.phone, body.addressLocation, body.role, body.order ? Number(body.order) : 1, imagePath, id
    );

    const row = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
    res.json(rowToStudent(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove a student
adminStudentRouter.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM students WHERE id = ?').run(Number(req.params.id));
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { adminStudentRouter };
export default router;
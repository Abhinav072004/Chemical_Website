import { Router } from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // This is what reads the file!

const router = Router();

function rowToFaculty(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    education: row.education,
    research: JSON.parse(row.research || '[]'),
    email: row.email,
    phone: row.phone || undefined,
    office: row.office || undefined,
    homePage: row.home_page || undefined,
    publications: row.publications !== undefined && row.publications !== null ? row.publications : undefined,
    experience: row.experience || undefined,
    image: row.image,
    category: row.category,
  };
}

router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM faculty ORDER BY sort_order ASC, id ASC').all();
    res.json(rows.map(rowToFaculty));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM faculty WHERE id = ?').get(Number(req.params.id));
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(rowToFaculty(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const adminRouter = Router({ mergeParams: true });
adminRouter.use(authMiddleware);

// CRITICAL: upload.single('imageFile') MUST be here to read the form
adminRouter.post('/', upload.single('imageFile'), (req, res) => {
  // Debugging logs to prove the data arrived!
  console.log("=== NEW FACULTY REQUEST RECEIVED ===");
  console.log("Text Data:", req.body);
  console.log("Image File:", req.file);

  const body = req.body || {};
  let rawResearch = body.research || body['research[]'] || [];
  if (typeof rawResearch === 'string') rawResearch = [rawResearch];
  const research = JSON.stringify(rawResearch);

  const imagePath = req.file ? `/uploads/${req.file.filename}` : (body.image || '/placeholder.jpg');

  try {
    const stmt = db.prepare(`
      INSERT INTO faculty (name, position, education, research, email, phone, office, home_page, publications, experience, image, category, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.name || '',
      body.position || '',
      body.education || '',
      research,
      body.email || '',
      body.phone || null,
      body.office || null,
      body.homePage || null,
      body.publications != null ? String(body.publications) : null,
      body.experience || null,
      imagePath,
      body.category || 'core',
      body.sort_order != null ? body.sort_order : 0
    );
    const row = db.prepare('SELECT * FROM faculty WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(rowToFaculty(row));
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

adminRouter.put('/:id', upload.single('imageFile'), (req, res) => {
  const id = Number(req.params.id);
  const body = req.body || {};

  try {
    const existing = db.prepare('SELECT id, image FROM faculty WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    let rawResearch = body.research || body['research[]'] || undefined;
    if (rawResearch && typeof rawResearch === 'string') rawResearch = [rawResearch];
    const research = rawResearch ? JSON.stringify(rawResearch) : undefined;

    let imagePath = req.file ? `/uploads/${req.file.filename}` : body.image;

    const updates = [];
    const values = [];

    const map = {
      name: body.name, position: body.position, education: body.education,
      research: research, email: body.email, phone: body.phone, office: body.office,
      home_page: body.homePage, publications: body.publications != null ? String(body.publications) : null,
      experience: body.experience, image: imagePath, category: body.category, sort_order: body.sort_order,
    };

    Object.keys(map).forEach((key) => {
      if (map[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(map[key]);
      }
    });

    if (updates.length === 0) return res.json(rowToFaculty(existing));

    values.push(id);
    db.prepare(`UPDATE faculty SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    const row = db.prepare('SELECT * FROM faculty WHERE id = ?').get(id);
    res.json(rowToFaculty(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRouter.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM faculty WHERE id = ?').run(Number(req.params.id));
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { adminRouter };
export default router;
import { Router } from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';
import upload from '../middleware/upload.js'; // <-- IMPORT UPLOAD MIDDLEWARE

const router = Router();

// Helper: Convert DB row to Frontend object
function rowToEvent(row) {
  if (!row) return null;
  const base = {
    id: row.id,
    title: row.title,
    date: row.date,
    description: row.description || '',
  };
  
  if (row.event_type === 'upcoming') {
    return {
      ...base,
      time: row.time,
      location: row.location,
      type: row.type,
      registrations: row.registrations,
      maxCapacity: row.max_capacity,
      status: row.status,
      color: row.color,
      eventType: 'upcoming'
    };
  }
  
  return {
    ...base,
    participants: row.participants,
    image: row.image,
    eventType: 'past'
  };
}

// --- PUBLIC ROUTES ---
router.get('/', (req, res) => {
  try {
    const upcoming = db.prepare("SELECT * FROM events WHERE event_type = 'upcoming' ORDER BY sort_order ASC, date ASC").all();
    const past = db.prepare("SELECT * FROM events WHERE event_type = 'past' ORDER BY sort_order ASC, date DESC").all();
    res.json({ upcoming: upcoming.map(rowToEvent), past: past.map(rowToEvent) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN ROUTES ---
const adminRouter = Router({ mergeParams: true });
adminRouter.use(authMiddleware);

// Helper: Convert Frontend object to DB row
function eventToRow(body, eventType) {
  const common = {
    title: body.title || '',
    date: body.date || '',
    description: body.description || '',
    sort_order: body.sort_order != null ? body.sort_order : 0,
  };
  
  if (eventType === 'upcoming') {
    return {
      ...common,
      time: body.time || null,
      location: body.location || null,
      type: body.type || null,
      registrations: body.registrations != null ? body.registrations : null,
      max_capacity: body.maxCapacity != null ? body.maxCapacity : null,
      status: body.status || null,
      color: body.color || null,
      participants: null,
      image: null,
      event_type: 'upcoming',
    };
  }
  
  return {
    ...common,
    time: null,
    location: null,
    type: null,
    registrations: null,
    max_capacity: null,
    status: null,
    color: null,
    participants: body.participants != null ? body.participants : null,
    image: body.image || null,
    event_type: 'past',
  };
}

adminRouter.post('/', upload.single('imageFile'), (req, res) => {
  const body = req.body || {};
  
  // If an image was uploaded, overwrite the body.image field before converting
  if (req.file) {
    body.image = `/uploads/${req.file.filename}`;
  }

  const eventType = body.eventType === 'past' ? 'past' : 'upcoming';
  const r = eventToRow(body, eventType);
  
  try {
    const stmt = db.prepare(`
      INSERT INTO events (title, date, time, location, type, description, registrations, max_capacity, participants, status, color, image, event_type, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      r.title, r.date, r.time, r.location, r.type, r.description,
      r.registrations, r.max_capacity, r.participants, r.status, r.color, r.image,
      r.event_type, r.sort_order
    );
    
    const id = db.prepare('SELECT last_insert_rowid() as id').get().id;
    const row = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    res.status(201).json(rowToEvent(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRouter.put('/:id', upload.single('imageFile'), (req, res) => {
  const id = Number(req.params.id);
  const body = req.body || {};
  
  try {
    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    
    // If an image was uploaded, overwrite the body.image field
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`;
    }

    const eventType = body.eventType || existing.event_type;
    const r = eventToRow(body, eventType);
    
    db.prepare(`
      UPDATE events SET
        title = ?, date = ?, time = ?, location = ?, type = ?, description = ?,
        registrations = ?, max_capacity = ?, participants = ?, status = ?, color = ?, image = ?,
        event_type = ?, sort_order = ?
      WHERE id = ?
    `).run(
      r.title, r.date, r.time, r.location, r.type, r.description,
      r.registrations, r.max_capacity, r.participants, r.status, r.color, r.image,
      r.event_type, r.sort_order, id
    );
    
    const row = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    res.json(rowToEvent(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

adminRouter.delete('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = db.prepare('DELETE FROM events WHERE id = ?').run(id);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { adminRouter };
export default router;
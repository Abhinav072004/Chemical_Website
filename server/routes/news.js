import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get all news
router.get('/', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Add new news headline (Requires Admin Auth in production)
router.post('/', (req, res) => {
  try {
    const { text } = req.body;
    const stmt = db.prepare('INSERT INTO news (text) VALUES (?)');
    const result = stmt.run(text);
    res.json({ id: result.lastInsertRowid, text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add news' });
  }
});

// Delete a news headline
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM news WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

export default router;
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all leads (with search/filter)
router.get('/', async (req, res) => {
  try {
    const { search, status, source } = req.query;
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR phone ILIKE $${params.length})`;
    }
    if (status) {
      params.push(status);
      query += ` AND status = $${params.length}`;
    }
    if (source) {
      params.push(source);
      query += ` AND source = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'Interested') AS interested,
        COUNT(*) FILTER (WHERE status = 'Not Interested') AS not_interested,
        COUNT(*) FILTER (WHERE status = 'Converted') AS converted,
        COUNT(*) FILTER (WHERE source = 'Call') AS from_call,
        COUNT(*) FILTER (WHERE source = 'WhatsApp') AS from_whatsapp,
        COUNT(*) FILTER (WHERE source = 'Field') AS from_field
      FROM leads
    `);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a new lead
router.post('/', async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    if (!name || !phone || !source) {
      return res.status(400).json({ error: 'Name, phone, and source are required' });
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Phone must be a valid 10-digit number' });
    }
    if (!['Call', 'WhatsApp', 'Field'].includes(source)) {
      return res.status(400).json({ error: 'Source must be Call, WhatsApp, or Field' });
    }

    const result = await pool.query(
      'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), phone.trim(), source]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update lead status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Interested', 'Not Interested', 'Converted'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const result = await pool.query(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a lead
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM leads WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
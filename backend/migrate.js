const pool = require('./db');

async function migrate() {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        source VARCHAR(50) DEFAULT 'Call',
        status VARCHAR(50) DEFAULT 'Interested',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Leads table created/verified');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    process.exit(1);
  }
}

migrate();

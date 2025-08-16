const db = require('../db');

async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      amount NUMERIC NOT NULL,
      description TEXT
    )
  `);
}

function getAll() {
  return db.query('SELECT * FROM invoices ORDER BY id');
}

function getById(id) {
  return db.query('SELECT * FROM invoices WHERE id = $1', [id]);
}

function create(amount, description) {
  return db.query(
    'INSERT INTO invoices (amount, description) VALUES ($1, $2) RETURNING *',
    [amount, description]
  );
}

function update(id, amount, description) {
  return db.query(
    'UPDATE invoices SET amount = $1, description = $2 WHERE id = $3 RETURNING *',
    [amount, description, id]
  );
}

function remove(id) {
  return db.query('DELETE FROM invoices WHERE id = $1', [id]);
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove
};

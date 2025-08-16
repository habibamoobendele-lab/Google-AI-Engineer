const db = require('../db');

async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      amount NUMERIC NOT NULL,
      category TEXT
    )
  `);
}

function getAll() {
  return db.query('SELECT * FROM expenses ORDER BY id');
}

function getById(id) {
  return db.query('SELECT * FROM expenses WHERE id = $1', [id]);
}

function create(amount, category) {
  return db.query(
    'INSERT INTO expenses (amount, category) VALUES ($1, $2) RETURNING *',
    [amount, category]
  );
}

function update(id, amount, category) {
  return db.query(
    'UPDATE expenses SET amount = $1, category = $2 WHERE id = $3 RETURNING *',
    [amount, category, id]
  );
}

function remove(id) {
  return db.query('DELETE FROM expenses WHERE id = $1', [id]);
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  remove
};

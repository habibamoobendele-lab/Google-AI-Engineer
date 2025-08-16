const express = require('express');
const router = express.Router();
const expenses = require('../models/expense');

router.get('/', async (req, res, next) => {
  try {
    const result = await expenses.getAll();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await expenses.getById(req.params.id);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { amount, category } = req.body;
    const result = await expenses.create(amount, category);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { amount, category } = req.body;
    const result = await expenses.update(req.params.id, amount, category);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await expenses.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

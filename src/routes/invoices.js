const express = require('express');
const router = express.Router();
const invoices = require('../models/invoice');

router.get('/', async (req, res, next) => {
  try {
    const result = await invoices.getAll();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await invoices.getById(req.params.id);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    const result = await invoices.create(amount, description);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { amount, description } = req.body;
    const result = await invoices.update(req.params.id, amount, description);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await invoices.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

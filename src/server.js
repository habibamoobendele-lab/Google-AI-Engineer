const express = require('express');
const invoicesRouter = require('./routes/invoices');
const expensesRouter = require('./routes/expenses');
const invoiceModel = require('./models/invoice');
const expenseModel = require('./models/expense');

const app = express();
app.use(express.json());
app.use('/invoices', invoicesRouter);
app.use('/expenses', expensesRouter);

const port = process.env.PORT || 3000;

async function start() {
  await invoiceModel.init();
  await expenseModel.init();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});

module.exports = app;

const express = require('express');
const router = express.Router();

router.get('/accounts/:id/cards', (req, res) => {
  const accountId = req.params.id;
  const account = { id: accountId, name: `Account ${accountId}` };
  res.render('cards', { account });
});

router.get('/accounts/:id/cards/add', (req, res) => {
  const accountId = req.params.id;
  res.render('add-card', { accountId });
});

module.exports = router;

router.get('/cards', (req, res) => {
    res.render('cards');
  });

router.post('/accounts/:id/cards', (req, res) => {
    const accountId = req.params.id;
    const { name, level, price, bonus } = req.body;
    // тут вам потрібно додати логіку для додавання нової карточки до бази даних
    // для прикладу, я використовую фейковий об'єкт
    const card = { id: Date.now(), name, level, price, bonus, accountId };
    res.redirect(`/accounts/${accountId}/cards`);
  });

  
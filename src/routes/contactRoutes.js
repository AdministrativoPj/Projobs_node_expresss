const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/contact', (req, res) => {
  res.render('contact', { mensaje: null, error: null });
});

router.post('/contact', contactController.sendContactEmail);

module.exports = router;

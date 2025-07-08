const express = require('express');
const router = express.Router();
const { ensureAuthenticated, soloClientes } = require('../middlewares/authMiddleware');

router.get('/cliente/dashboard', ensureAuthenticated, soloClientes, (req, res) => {
  res.render('cliente/dashboard', { usuario: req.session.usuarioNombre });
});

module.exports = router;

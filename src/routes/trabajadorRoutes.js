const express = require('express');
const router = express.Router();
const { ensureAuthenticated, soloTrabajadores } = require('../middlewares/authMiddleware');

router.get('/trabajador/dashboard', ensureAuthenticated, soloTrabajadores, (req, res) => {
  res.render('trabajador/dashboard', { usuario: req.session.usuarioNombre });
});

module.exports = router;

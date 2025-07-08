const express = require('express');
const router = express.Router();
const { ensureAuthenticated, soloAdmins } = require('../middlewares/authMiddleware');

router.get('/admin/dashboard', ensureAuthenticated, soloAdmins, (req, res) => {
  res.render('admin/dashboard', { usuario: req.session.usuarioNombre });
});

module.exports = router;
  
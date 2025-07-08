function soloClientes(req, res, next) {
  if (req.session.usuarioRol === 2) return next();
  return res.redirect('/');
}

function soloTrabajadores(req, res, next) {
  if (req.session.usuarioRol === 3) return next();
  return res.redirect('/');
}

function soloAdmins(req, res, next) {
  if (req.session.usuarioRol === 1) return next();
  return res.redirect('/');
}

module.exports = { soloClientes, soloTrabajadores, soloAdmins };

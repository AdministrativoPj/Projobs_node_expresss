function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.usuarioId) {
    return next(); // Usuario autenticado
  }
  return res.redirect('/login'); // Si no ha iniciado sesión
}

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

module.exports = {
  ensureAuthenticated,
  soloClientes,
  soloTrabajadores,
  soloAdmins
};

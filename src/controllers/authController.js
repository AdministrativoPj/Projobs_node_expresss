const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const { enviarCorreoBienvenida, enviarCorreoRecuperacion } = require('../utils/mailer');
const PasswordReset = require('../models/passwordReset');

const authController = {
  showLoginForm: (req, res) => {
    res.render('login', { error: null });
  },

  login: async (req, res) => {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    req.session.usuarioId = usuario.id;
    req.session.usuarioNombre = usuario.nombre;
    req.session.usuarioRol = usuario.rol;

    if (usuario.rol === 1) return res.redirect('/admin/dashboard');
    if (usuario.rol === 2) return res.redirect('/cliente/dashboard');
    if (usuario.rol === 3) return res.redirect('/trabajador/dashboard');

    res.redirect('/');
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  },

  showRegisterForm: (req, res) => {
    res.render('register', { error: null });
  },

  registerUser: async (req, res) => {
    const { nombre, apellido, correo, password, rol } = req.body;

    try {
      const rolInt = parseInt(rol);
      if (![2, 3].includes(rolInt)) {
        return res.render('register', { error: 'Rol no permitido' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await Usuario.create({
        nombre,
        apellido,
        correo,
        password: hashedPassword,
        rol: rolInt
      });

      await enviarCorreoBienvenida(correo, nombre);

      res.redirect('/login');
    } catch (error) {
      console.error(error);

      let errorMsg = 'Error al registrar usuario';
      if (error.name === 'SequelizeUniqueConstraintError') {
        errorMsg = 'El correo ya está registrado';
      }

      res.render('register', { error: errorMsg });
    }
  },

  facebookCallback: async (req, res) => {
    try {
      const perfil = req.user;

      if (!perfil || !perfil.emails || perfil.emails.length === 0) {
        return res.redirect('/login');
      }

      const email = perfil.emails[0].value;
      let usuario = await Usuario.findOne({ where: { correo: email } });

      if (!usuario) {
        usuario = await Usuario.create({
          nombre: perfil.name?.givenName || 'Usuario',
          apellido: perfil.name?.familyName || 'Facebook',
          correo: email,
          password: '',
          rol: 2
        });
      }

      req.session.usuarioId = usuario.id;
      req.session.usuarioNombre = usuario.nombre;
      req.session.usuarioRol = usuario.rol;

      if (usuario.rol === 1) return res.redirect('/admin/dashboard');
      if (usuario.rol === 2) return res.redirect('/cliente/dashboard');
      if (usuario.rol === 3) return res.redirect('/trabajador/dashboard');

      res.redirect('/');
    } catch (error) {
      console.error('Error en facebookCallback:', error);
      res.redirect('/login');
    }
  },

  showRecoveryForm: (req, res) => {
    res.render('recuperar', { mensaje: null, error: null });
  },

  sendRecoveryEmail: async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
      return res.render('recuperar', { mensaje: null, error: 'Debes ingresar un correo' });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.render('recuperar', { mensaje: null, error: 'No hay usuario con ese correo' });
    }

    try {
      const token = Math.random().toString(36).substr(2);
      const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

      await PasswordReset.create({ correo, token, expiracion });

      const link = `http://localhost:3000/reset-password/${token}`;
      await enviarCorreoRecuperacion(correo, link);

      res.render('recuperar', { mensaje: 'Revisa tu correo para recuperar tu contraseña.', error: null });
    } catch (err) {
      console.error(err);
      res.render('recuperar', { mensaje: null, error: 'Error al procesar la recuperación.' });
    }
  },

  showResetForm: async (req, res) => {
    const { token } = req.params;

    const reset = await PasswordReset.findOne({ where: { token } });

    if (!reset) {
      return res.render('reset-password', { token: null, error: 'Token inválido o expirado', mensaje: null });
    }

    if (reset.expiracion < new Date()) {
      return res.render('reset-password', { token: null, error: 'El enlace ha expirado', mensaje: null });
    }

    res.render('reset-password', { token, error: null, mensaje: null });
  },

  resetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const reset = await PasswordReset.findOne({ where: { token } });

    if (!reset) {
      return res.render('reset-password', { token: null, error: 'Token inválido o expirado', mensaje: null });
    }

    if (reset.expiracion < new Date()) {
      return res.render('reset-password', { token: null, error: 'El enlace ha expirado', mensaje: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.update({ password: hashedPassword }, { where: { correo: reset.correo } });

    await PasswordReset.destroy({ where: { token } });

    res.render('reset-password', { token: null, error: null, mensaje: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.' });
  }
};

module.exports = authController;

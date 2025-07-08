require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const { sequelize } = require('./models'); // ✅ usar solo esta instancia
const authController = require('./controllers/authController');

const app = express();

// CONFIGURACIÓN PASSPORT FACEBOOK
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'name', 'photos']
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// CONFIGURACIÓN EXPRESS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONFIGURACIÓN DE SESIONES Y PASSPORT
app.use(session({
  secret: 'clave_super_secreta',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// RUTA INICIAL
app.get('/', (req, res) => {
  res.render('index', { mensaje: null, error: null });
});

// RUTAS DE FACEBOOK LOGIN
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authController.facebookCallback
);

// RUTAS GENERALES
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const trabajadorRoutes = require('./routes/trabajadorRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(authRoutes);
app.use('/', contactRoutes);
app.use(clienteRoutes);
app.use(trabajadorRoutes);
app.use(adminRoutes);

// INICIO DE SERVIDOR Y SINCRONIZACIÓN DE BASE DE DATOS
const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al conectar con la base de datos:', err);
});

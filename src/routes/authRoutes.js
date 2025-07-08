const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Login local
router.get('/login', authController.showLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Registro
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);

// Login con Facebook
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authController.facebookCallback
);

// Recuperar contraseña
router.get('/recuperar', authController.showRecoveryForm);
router.post('/recuperar', authController.sendRecoveryEmail); 

router.get('/reset-password/:token', authController.showResetForm);
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;

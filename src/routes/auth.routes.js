const express = require('express');
const router = express.Router();
const autenticacionController = require('../controllers/auth.controller');

// Ruta para la autenticación de usuarios
router.post('/login', autenticacionController.login);

module.exports = router;
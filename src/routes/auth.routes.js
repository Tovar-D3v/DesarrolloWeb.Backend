// Importamos la biblioteca Express para crear rutas
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');


router.post('/login', authController.login);

// Exportamos el router para que se puedan utilizar las rutas  que se definió
module.exports = router;
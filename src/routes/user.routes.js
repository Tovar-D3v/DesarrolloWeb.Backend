const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/user.controller');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Rutas para la gestión de usuarios
router.post('/create', usuarioController.createUser);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.updateUser);
router.get('/', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsersByAdministradorId);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.deleteUser);
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsersByRolId);

router.use(errorHandler);

module.exports = router;
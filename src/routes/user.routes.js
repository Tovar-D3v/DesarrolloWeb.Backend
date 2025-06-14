const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/user.controller');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Rutas para la gestión de usuarios
router.post('/users/create', usuarioController.createUser);
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.updateUser);
router.get('/users/', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsersByAdministradorId);
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), usuarioController.getAllUsersByRolId);

router.use(errorHandler);

module.exports = router;
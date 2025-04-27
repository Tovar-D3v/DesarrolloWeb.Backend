const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

router.post('/create', userController.createUser);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

router.use(errorHandler);

module.exports = router;
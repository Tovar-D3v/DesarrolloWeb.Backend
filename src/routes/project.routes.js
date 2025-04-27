const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Rutas para la gestión de proyectos
router.post('/create', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.createProject);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.updateProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.getAllProjects);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.deleteProject);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.getProjectById);

router.post('/associate', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.assingUsersToProject);
router.delete('/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.removeUserFromProject);

module.exports = router;
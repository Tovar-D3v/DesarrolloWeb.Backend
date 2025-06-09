const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Rutas para la gestión de proyectos
router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.createProject);
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.updateProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.getAllProjects);
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.deleteProject);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.getProjectById);

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.assingUsersToProject);
router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), proyectoController.removeUserFromProject);

module.exports = router;
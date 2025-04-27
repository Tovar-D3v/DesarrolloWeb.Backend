const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

router.post('/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById);

router.post('/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject);
router.delete('/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

module.exports = router;
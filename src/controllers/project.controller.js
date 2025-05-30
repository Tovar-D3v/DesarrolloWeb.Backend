const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id );
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos
exports.assingUsersToProject = async (req, res) => {
    try {
        const data = req.body;
        const project = await projectService.assingUsersToProject(data);
        res.status(200).json({ message: 'Usuarios asignados al proyecto con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para remover un usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        const data = req.body;
        const result = await projectService.removeUserFromProject(data);
        res.status(200).json({ message: 'Usuario eliminado del proyecto con éxito', result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un proyecto
exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, administrador_id } = req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await projectService.deleteProject(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
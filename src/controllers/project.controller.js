const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id );
        res.status(201).json({ message: 'Proyecto creado con éxito', project: newProject });
    } catch (err) {
        console.log("Error al crear el proyecto:", err);
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        console.log("Error al obtener los proyectos:", err);
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
        console.log("Error al asignar usuarios al proyecto:", err);
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
        console.log("Error al eliminar usuario del proyecto:", err);
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
        console.log("Error al obtener el proyecto por ID:", err);
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
        console.log("Error al actualizar el proyecto:", err);
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Paso 1: Eliminar asociaciones de usuarios con el proyecto
      await projectService.removeAllUsersFromProject(id);
  
      // Paso 2: Eliminar el proyecto
      const result = await projectService.deleteProject(id);
  
      res.status(200).json({ message: 'Proyecto eliminado con éxito', result });
    } catch (err) {
      console.log("Error al eliminar el proyecto:", err);
      res.status(500).json({ message: err.message });
    }
  };
  
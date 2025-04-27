const Project = require('../models/project.model');
const User = require('../models/user.model');

// Servicio para crear un nuevo proyecto
exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        const newProject = await Project.create({
            nombre,
            descripcion,
            administrador_id
        });

        return newProject;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Servicio para obtener todos los proyectos
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Servicio para obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Servicio para asignar usuarios a un proyecto
exports.assingUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');
    
    const users = await User.findAll({ where: { id: data.userIds }});
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await project.reload({
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ],
    });
    return project;
};

// Servicio para eliminar un usuario de un proyecto
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) 
        throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.userId);
    if (!user) 
        throw new Error('Usuario no encontrado');

    await project.removeUsuario(user);
};

// Servicio para actualizar un proyecto
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update({
            nombre,
            descripcion,
            administrador_id,
        });

        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Servicio para eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};
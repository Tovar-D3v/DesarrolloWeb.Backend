const userService = require('../services/user.service');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try { 
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los usuarios
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para obtener todos los usuarios por rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para obtener un usuario por su ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body; 
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'El susuario a actualizado con éxito', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const currentUserId = req.user.id;
  
    // Impedir que un usuario se borre a sí mismo
    if (Number(id) === currentUserId) {
      return res
        .status(403)
        .json({ message: 'No puedes eliminar tu propio usuario mientras estés logueado.' });
    }
  
    //  Si no es el mismo eliminar
    try {
      const result = await userService.deleteUser(id, currentUserId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

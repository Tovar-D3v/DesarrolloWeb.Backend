const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("../models/user.model");
const RolePermisssion = require("../models/rolePermission.model");

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Servicio de autenticación
exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Usuario no encontrada");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    const rolePermissions = await RolePermisssion.findAll({
      where: { rol_id: user.rol_id },
      attributes: ["permiso_id"],
    }); 

    const permisos = rolePermissions.map(rp => rp.permiso_id);

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol_id: user.rol_id,
        permisos,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log("token", token);
    return token;
  } catch (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
};

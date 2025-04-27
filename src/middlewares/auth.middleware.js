const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// Verifica si el token es válido y extrae la información del usuario
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token'});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.user = user;
        next();
    });
};

// Middleware para verificar el rol del usuario
const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.user;
        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción'})
        }        
        next();
    };
};

module.exports = { authenticateToken, checkRole };
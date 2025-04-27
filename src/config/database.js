// Importamos Sequelize para conectar a la base de datos
const { Sequelize } = require('sequelize');

// Cargamos las variables de entorno
const dotenv = require('dotenv');
dotenv.config();

// Creamos la instancia de Sequelize usando los datos de conexión
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
        timezone: '-05:00'
    }
);

// Exportar
module.exports = sequelize;

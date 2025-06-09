const sequelize = require('./config/database');
const app       = require('./app');
require('./models/associations');
const dotenv    = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL con Sequelize');

    await sequelize.sync({
      alter: true,
      logging: console.log
    });
    console.log('✅ Base de datos sincronizada (alter).');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la aplicación:', err);
  }
}

start();

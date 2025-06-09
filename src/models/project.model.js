const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo proyectos
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }, 
    
}, {
    timestamps: false,
    tableName: 'proyectos',
    underscored: true,
    
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours()- 5);
            }
        }
    }
});
module.exports = Project;
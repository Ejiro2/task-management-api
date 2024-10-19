const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false  // This ensures the title can't be null
    },
    description: {
        type: DataTypes.STRING(250)  // Matching the DB field size
    },
    status: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt

});

module.exports = task;





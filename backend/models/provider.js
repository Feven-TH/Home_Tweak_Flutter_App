// models/Provider.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    certificate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hourlyRate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    serviceDescription: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'providers'
});

module.exports = Provider;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending' // default if not provided
    }
}, {
    tableName: 'bookings',
    timestamps: true
});

module.exports = Booking;

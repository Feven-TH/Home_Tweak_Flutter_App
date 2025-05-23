const sequelize = require('../config/db'); // This is your sequelize instance
const User = require('./user');
const Provider = require('./provider');
const Booking = require('./booking');
const Category = require('./category');

// Define associations
Provider.belongsTo(User, { foreignKey: 'userId' });
Provider.belongsTo(Category, { foreignKey: 'categoryId' });

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Provider, { foreignKey: 'providerId' });

User.hasMany(Provider, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Category.hasMany(Provider, { foreignKey: 'categoryId' });

// Export the models & sequelize instance
module.exports = {
    sequelize,
    User,
    Provider,
    Booking,
    Category
};

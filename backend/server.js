const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');

// Import routes
const providerRoutes = require('./routes/provider.routes');
const bookingRoutes = require('./routes/booking.routes');
const categoryRoutes = require('./routes/category.routes');
const userRoutes = require('./routes/user.routes');


dotenv.config();

const app = express();

app.use(express.json());

// Correct route usage
app.use('/providers', providerRoutes);
app.use('/bookings', bookingRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

const PORT= 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); 
    })
    .then(() => {
        console.log('Models synced!');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

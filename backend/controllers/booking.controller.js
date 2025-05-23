const { Booking, Provider, User , Category} = require('../models');
const { Sequelize } = require('sequelize');

// Create a booking (Service Booking)
exports.createBooking = async (req, res) => {
    try {
        const { userId, providerId,serviceDate, } = req.body;

        if (!userId || !providerId || !serviceDate ) {
        return res.status(400).json({ message: "userId, providerId, and bookingDate are required" });
        }
        const newBooking = await Booking.create({
            userId,
            providerId,
            serviceDate,
            bookingDate: new Date()
        });
        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

// Get bookings for a provider (Viewing Bookings)
exports.getBookingsByProvider = async (req, res) => {
    try {
        const providerId = req.params.providerId;
        const bookings = await Booking.findAll({
            where: { providerId }
        });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get bookings for a user (Optional: if user wants to see their bookings)


// Get bookings for a user (Optional: if user wants to see their bookings)
exports.getBookingsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const bookings = await Booking.findAll({
            where: { userId },
            include: [
                {
                    model: Provider,
                    include: [
                        {
                            model: User,
                            attributes: []
                        },
                        {
                            model: Category,
                            attributes: []
                        }
                    ],
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [Sequelize.col('Provider.User.username'), 'providerName'],
                    [Sequelize.col('Provider.Category.name'), 'categoryName'],
                    [Sequelize.col('Provider.hourlyRate'), 'hourlyRate'],
                    [Sequelize.col('Provider.location'), 'location']
                ]
            }
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



// Update booking status (Update Booking Status)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const [updated] = await Booking.update({ status }, { where: { id } });
        if (updated) {
            const updatedBooking = await Booking.findByPk(id);
            return res.status(200).json(updatedBooking);
        }
        throw new Error('Booking not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reschedule a booking
exports.rescheduleBooking = async (req, res) => {
  const { id } = req.params;
  const { serviceDate } = req.body;

  try {
    if (!serviceDate) {
      return res.status(400).json({ message: "serviceDate is required" });
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.serviceDate = serviceDate;
    await booking.save();

    res.json({ message: "Booking rescheduled successfully", booking });
  } catch (error) {
    console.error("Error rescheduling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Cancel booking (Cancel Booking)
exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Booking.update({ status: 'Cancelled' }, { where: { id } });
        if (updated) {
            const updatedBooking = await Booking.findByPk(id);
            return res.status(200).json(updatedBooking);
        }
        throw new Error('Booking not found');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

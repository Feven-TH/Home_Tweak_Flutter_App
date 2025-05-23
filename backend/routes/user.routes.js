const express = require("express");
const router = express.Router();

const { authMiddleware, authorizeRoles } = require("../middleware/auth.Middleware");
const userController = require("../controllers/user.controller");

// Register user (expects username, email, password, role)
router.post("/register", userController.register);

// Login user (expects email, password)
router.post("/login", userController.login);

// forgot-password (expects email)
router.post('/forgot-password', userController.forgotPassword);

// reset-password (expects email, reseCode, newPassword)
router.post('/reset-password', userController.resetPassword);

// Protected route - only accessible by Service Providers
router.get(
  "/service-provider-only",
  authMiddleware,
  authorizeRoles(["serviceProvider"]),
  (req, res) => {
    res.json({ message: `Welcome, Service Provider ${req.user.username}!` });
  }
);

// Protected route - only accessible by Customers
router.get(
  "/customer-only",
  authMiddleware,
  authorizeRoles(["customer"]),
  (req, res) => {
    res.json({ message: `Welcome, Customer ${req.user.username}!` });
  }
);

// Logout User
router.post('/logout/:userId', userController.logout);

// Delete user by id (protected route)
router.delete("/:id", authMiddleware, userController.deleteUser);

// Get user by id (protected route)
router.get("/:id", authMiddleware, userController.getUserById);

module.exports = router;

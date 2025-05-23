const express = require('express');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);




module.exports = router;

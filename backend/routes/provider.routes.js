const express = require('express');
const router = express.Router();
const providerController = require('../controllers/provider.controller');

router.post('/', providerController.createProvider);
router.get('/', providerController.getAllProviders);
router.get('/category/:categoryId', providerController.getProvidersByCategory);
router.put('/:id', providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);
router.get('/search', providerController.searchProvidersByName);


module.exports = router;

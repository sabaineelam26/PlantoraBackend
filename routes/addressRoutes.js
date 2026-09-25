const express = require('express');
const router = express.Router();
const controller = require('../Controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.post('/', controller.createAddress);
router.get('/', controller.getAddresses);
router.get('/:id', controller.getAddress);
router.put('/:id', controller.updateAddress);
router.delete('/:id', controller.deleteAddress);

module.exports = router;
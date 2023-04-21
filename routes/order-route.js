const express = require('express')
const router = express.Router()
const orderController =   require('../controllers/orderController');
// Retrieve all offer
router.get('/', orderController.findAll);


// Create a new offer
router.post('/add', orderController.create);
// Retrieve a single offer with id
router.get('/:id', orderController.findOne);
// Update a offer with id
router.post('/update', orderController.update);
// Delete a offer with id
router.get('/delete/:id', orderController.delete);

module.exports = router
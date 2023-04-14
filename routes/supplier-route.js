const express = require('express')
const router = express.Router()
const supplierController =   require('../controllers/supplierController');
// Retrieve all offer
router.get('/', supplierController.findAll);
// Retrieve all offer
router.get('/viewlist', supplierController.viewItem);
// Create a new offer
router.post('/add', supplierController.create);
// Retrieve a single offer with id
router.get('/:id', supplierController.findOne);
// Update a offer with id
router.post('/update', supplierController.update);
// Delete a offer with id
router.get('/delete/:id', supplierController.delete);

module.exports = router
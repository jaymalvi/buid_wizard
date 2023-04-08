const express = require('express')
const router = express.Router()
const offerController =   require('../controllers/offerController');
// Retrieve all offer
router.get('/', offerController.findAll);
// Create a new offer
router.post('/add', offerController.create);
// Retrieve a single offer with id
router.get('/:id', offerController.findOne);
// Update a offer with id
router.post('/update', offerController.update);
// Delete a offer with id
router.get('/delete/:id', offerController.delete);

module.exports = router
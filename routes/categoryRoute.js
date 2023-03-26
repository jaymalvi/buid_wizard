const express = require('express')
const router = express.Router()
const categoryController =   require('../controllers/categoryController');
// Retrieve all category
router.get('/', categoryController.findAll);
// Create a new category
router.post('/add', categoryController.create);
// Retrieve a single category with id
router.get('/:id', categoryController.findOne);
// Update a category with id
router.post('/update', categoryController.update);
// Delete a category with id
router.get('/delete/:id', categoryController.delete);
module.exports = router
const express = require('express')
const router = express.Router()
const userController =   require('../controllers/userController');

const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Retrieve all offer
router.get('/', userController.findAll);
// Create a new offer
router.post('/add', upload.fields([
  { name: 'aadharCardImageURL' },
  { name: 'userImageURL' }]), userController.create);
// Retrieve a single offer with id
router.get('/:id', userController.findOne);
// Update a offer with id
router.post('/update', upload.fields([
  { name: 'aadharCardImageURL' },
  { name: 'userImageURL' }]), userController.update)
// Delete a offer with id
router.get('/delete/:id', userController.delete);

module.exports = router
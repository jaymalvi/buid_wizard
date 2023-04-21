const express = require('express')
const router = express.Router()
const supplierController =   require('../controllers/supplierController');

const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


// Retrieve all offer
router.get('/', supplierController.findAll);

 router.get('/showItem', supplierController.ShowBuyItemProvidedBySupllier);

 router.get('/order', supplierController.ShowOrder);
// Retrieve all offer
router.get('/viewlist', upload.single('cabinet_ImageURL'), supplierController.viewItem);


// Create a new offer
router.post('/add', supplierController.create);

router.post('/buyComponent', supplierController.supplierComponent);

// Retrieve a single offer with id
router.get('/:id', supplierController.findOne);

router.get('/acceptOrder/:id', supplierController.updateStatusBySupplier);

// Update a offer with id
router.post('/update', supplierController.update);
// Delete a offer with id
router.get('/delete/:id', supplierController.delete);

module.exports = router
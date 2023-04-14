const express = require('express')
const router = express.Router()
const cabinetController =   require('../controllers/cabinetController');

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

// Retrieve all cabinet
// router.get('/', (req, res) => {
//     res.render('pages/supllier/cabinet.ejs', { title: 'Component Craze' });
//   });

router.get('/', cabinetController.findAll);
// Create a new cabinet
router.post('/add', upload.single('cabinet_ImageURL'), cabinetController.create);
// Retrieve a single cabinet with id
router.get('/:id', cabinetController.findOne);
// Update a cabinet with id
router.post('/update', upload.single('cabinet_ImageURL'), cabinetController.update);
// Delete a cabinet with id
router.get('/delete/:id', cabinetController.delete);

module.exports = router


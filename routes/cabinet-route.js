const express = require('express')
const router = express.Router()
const cabinetController =   require('../controllers/cabinetController');
// Retrieve all cabinet
// router.get('/', (req, res) => {
//     res.render('pages/supllier/cabinet.ejs', { title: 'Component Craze' });
//   });

router.get('/', cabinetController.findAll);
// Create a new cabinet
router.post('/add', cabinetController.create);
// Retrieve a single cabinet with id
router.get('/:id', cabinetController.findOne);
// Update a cabinet with id
router.post('/update', cabinetController.update);
// Delete a cabinet with id
router.get('/delete/:id', cabinetController.delete);

module.exports = router


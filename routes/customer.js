const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer');

router.get('/anis',customerController.getHome);

router.get('/filter',customerController.getFilterPage);

router.get('/login',customerController.getLogin);

router.get('/signup',customerController.getSignup);

router.get('/cart',customerController.getCart);

router.get('/getCabinets',customerController.selectCabinet);

router.get('/getCpus',customerController.selectCpu);

router.get('/getGpus',customerController.selectGpu);

router.get('/getCoolings',customerController.selectCooling);

router.get('/getPowers',customerController.selectPower);

router.get('/getMothers',customerController.selectMother);

router.get('/getRams',customerController.selectRam);

router.get('/getStorages',customerController.selectStorage);

router.get('/getChipsets',customerController.selectChipset);

router.get('/getPeripherals',customerController.getPeripherals);

router.get('/cartCheckout?',customerController.getCheckout)


router.post('/postChipset',customerController.postChipset);

router.post('/postCart',customerController.addToCart);

router.post('/postSignup',customerController.postSignup);

router.post('/postLogin',customerController.postLogin);



exports.router = router;
const express = require('express');
const router = express.Router();

const controllers = require('../controllers/priceOfKindController');

router.get('/', controllers.showsKindOfNews);
router.post('/create', controllers.createPriceKind);
router.delete('/delete/:id', controllers.deletePriceKind);
router.post('/update/:id', controllers.updateKindOfNews);
router.get('/:id', controllers.getPriceOfKind)


module.exports = router;
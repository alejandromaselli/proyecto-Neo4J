const router = require('express').Router();

//controllers
const { connectToMap, readMapStream } = require('../controllers/map');
const { route } = require('./auth');

router.post('/map', connectToMap);
router.get('/map',readMapStream);

module.exports = router;

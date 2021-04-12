const { Router } = require('express');
const heroRouter = require('./hero');
const imageRouter = require('./image');
const powerRouter = require('./superpower');

const router = Router();

router.use('/superheroes', heroRouter);
router.use('/images', imageRouter);
router.use('/superpowers', powerRouter);

module.exports = router;
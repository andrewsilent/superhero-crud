const { Router } = require('express');
const { imageUpload } = require('./middlewares/imageUpload.mw');
const { heroInstance } = require('./middlewares/heroInstance.mw');
const { powersAdd } = require('./middlewares/powersAdd.mw');
const SuperheroController = require('./controllers/superhero.controller');
const { imageAdd } = require('./middlewares/imageAdd.mw');
const router = Router();

router.post(
  '/superheroes',
  imageUpload,
  imageAdd,
  powersAdd,
  SuperheroController.createHero,
);
router.get('/superheroes', SuperheroController.getAllHeroes);
router.get('/superheroes/:id', SuperheroController.getHero);
router.patch(
  '/superheroes/:id',
  heroInstance,
  imageUpload,
  imageAdd,
  powersAdd,
  SuperheroController.updateHero,
);
router.delete('/superheroes/:id', SuperheroController.deleteHero);

module.exports = router;

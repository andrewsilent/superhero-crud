const { Router } = require('express');
const { imageUpload } = require('../middlewares/imageUpload.mw');
const { heroInstance } = require('../middlewares/heroInstance.mw');
const { powersAdd } = require('../middlewares/powersAdd.mw');
const { imageAdd } = require('../middlewares/imageAdd.mw');
const pagination = require('../middlewares/pagination.mw');
const SuperheroController = require('../controllers/superhero.controller');

const heroRouter = Router();

heroRouter.post(
  '/',
  imageUpload,
  imageAdd,
  powersAdd,
  SuperheroController.createHero,
);
heroRouter.get('/', pagination, SuperheroController.getAllHeroes);
heroRouter.get('/:id', SuperheroController.getHero);
heroRouter.patch(
  '/:id',
  heroInstance,
  imageUpload,
  imageAdd,
  powersAdd,
  SuperheroController.updateHero,
);
heroRouter.delete('/:id', SuperheroController.deleteHero);

module.exports = heroRouter;

const { Router } = require('express');
const SuperpowerController = require('../controllers/superpower.controller');

const powerRouter = Router();

powerRouter.patch('/:powerId', SuperpowerController.updateSuperpower);
powerRouter.delete('/:powerId', SuperpowerController.deleteSuperpower);

module.exports = powerRouter;

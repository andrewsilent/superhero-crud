const { Router } = require('express');
const ImageController = require('../controllers/image.controller');

const imageRouter = Router();

imageRouter.delete('/:imageId', ImageController.deleteImage);

module.exports = imageRouter;

const { Image } = require('../models');
const createError = require('http-errors');

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;

    const rows = await Image.destroy({
      where: {
        id: imageId,
      },
    });

    if (rows !== 1) {
      return next(
        createError(400, 'Bad request. Image was not deleted, maybe not found'),
      );
    }

    res.status(200).send({ data: 'Image was deleted' });
  } catch (err) {
    next(err);
  }
};

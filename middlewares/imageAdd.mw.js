const { Image } = require('../models');

module.exports.imageAdd = async (req, res, next) => {
  try {
    const { files } = req;

    if(!files) {
      return next();
    }

    const images = await Image.bulkCreate(
      files.map(file => ({ imagePath: file.filename })),
    );

    if (!images) {
      return next(createError(400, 'Bad request. Images was not created'));
    }

    req.images = images;
    next();
  } catch (err) {
    next(err);
  }
};
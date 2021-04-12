const { Superhero, Image, Superpower } = require('../models');
const createError = require('http-errors');

module.exports.heroInstance = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const hero = await Superhero.findByPk(id, {
      include: [
        { model: Image, attributes: ['imagePath'] },
        {
          model: Superpower,
          attributes: ['superpower'],
          through: { attributes: [] },
        },
      ],
    });

    if (!hero) {
      return next(createError(404, 'Superhero not found'));
    }

    req.hero = hero;
    next();
  } catch (err) {
    next(err);
  }
};

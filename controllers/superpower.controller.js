const { Superpower } = require('../models');
const createError = require('http-errors');

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { powerId },
    } = req;

    const rows = await Superpower.destroy({
      where: {
        id: powerId,
      },
    });

    if (rows !== 1) {
      return next(
        createError(
          400,
          'Bad request. Superpower was not deleted, maybe not found',
        ),
      );
    }

    res.status(200).send({ data: 'Superpower was deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      params: { powerId },
      body: { superpower },
    } = req;

    const powerToUpdate = await Superpower.findByPk(powerId);
    const updatedPower = await powerToUpdate.update(
      { superpower },
      {
        returning: true,
      },
    );

    res.status(200).send({ data: updatedPower });
  } catch (err) {
    next(err);
  }
};

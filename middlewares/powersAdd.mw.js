const { Superpower } = require('../models');
const { Op } = require('sequelize');

module.exports.powersAdd = async (req, res, next) => {
  try {
    const {
      body: { superpowers },
    } = req;

    if (!superpowers) {
      return next();
    }

    const superpowersAlreadyExistArr = await Superpower.findAll({
      where: {
        superpower: { [Op.in]: [...superpowers] },
      },
    });

    const superpowersArr = await Superpower.bulkCreate(
      superpowers
        .filter(
          power =>
            !superpowersAlreadyExistArr
              .map(e => e.dataValues.superpower)
              .includes(power),
        )
        .map(power => ({
          superpower: power,
        })),
    );

    if (!superpowersArr) {
      return next(createError(400, 'Bad request. Superpowers was not created'));
    }

    superpowersArr.push(...superpowersAlreadyExistArr);

    req.superpowers = superpowersArr;
    next();
  } catch (err) {
    next(err);
  }
};

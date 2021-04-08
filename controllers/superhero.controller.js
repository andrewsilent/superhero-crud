const { Superhero, Superpower } = require('../models');
const createError = require('http-errors');

module.exports.createHero = async (req, res, next) => {
  try {
    const {
      body: { superpowers, nickname, realName, originDescription, catchPhrase },
      files,
    } = req;

    const hero = await Superhero.create({
      nickname: nickname,
      realName: realName,
      originDescription: originDescription,
      catchPhrase: catchPhrase,
    });

    if (!hero) {
      return next(createError(400, 'Bad request. Hero was not created'));
    }

    console.log('hero = ', hero);

    if (superpowers.length) {
      const superpowersArray = await Promise.all(
        superpowers.map(
          async superpower =>
            await Superpower.create({
              superpower: superpower,
            }),
        ),
      );

      const powersToHeroesArray = await Promise.all(
        superpowersArray.map(async power => await hero.addSuperpower(power)),
      );
    }

    // if (files.length) {
    //   files.map(async file => await Superhero.addImage(file.filename));
    // }

    res.status(201).send({ data: hero });
  } catch (err) {
    next(err);
  }
};

module.exports.getHero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const hero = await Hero.findByPk(id);

    if (!hero) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).send({ data: hero });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllHeroes = async (req, res, next) => {
  try {
    const {
      query: { page = 1, size = 5 },
    } = req;

    const { count: total, rows: heroes } = await Hero.findAll({
      limit: size,
      offset: (page - 1) * size,
    });

    if (!heroes.length) {
      return next(createError(404, 'Users not found'));
    }

    res.status(200).send({
      heroesCount: total,
      pagesCount: `${Math.ceil(total / size)}`,
      pageSize: size,
      currentPage: page,
      data: heroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const rows = await Superhero.destroy({
      where: {
        id: id,
      },
    });
    if (rows !== 1) {
      return next(
        createError(400, 'Bad request. Hero was not deleted, maybe not found'),
      );
    }
    res.status(200).send({ data: 'Hero was deleted' });
  } catch (err) {
    next(err);
  }
};

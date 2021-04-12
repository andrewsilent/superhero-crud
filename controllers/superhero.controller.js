const { Superhero, Superpower, Image } = require('../models');
const createError = require('http-errors');

module.exports.createHero = async (req, res, next) => {
  try {
    const {
      body: { nickname, realName, originDescription, catchPhrase },
      images,
      superpowers,
    } = req;

    const hero = await Superhero.create({
      nickname,
      realName,
      originDescription,
      catchPhrase,
    });

    if (!hero) {
      return next(createError(400, 'Bad request. Hero was not created'));
    }

    if (images) {
      await hero.addImages(images);
    }

    if (superpowers) {
      await hero.addSuperpowers(superpowers);
    }

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
      pagination: { limit, offset },
    } = req;

    const count = await Superhero.count();

    const heroes = await Superhero.findAll({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Image,
          attributes: ['imagePath'],
        },
        {
          model: Superpower,
          attributes: ['superpower'],
          through: { attributes: [] },
        },
      ],
    });

    if (!heroes) {
      return next(createError(404, 'Superheroes not found'));
    }

    res.status(200).send({
      heroesCount: count,
      pagesCount: Math.ceil(count / limit),
      pageSize: Number(limit),
      currentPage: Math.floor(offset / limit) + 1,
      data: heroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateHero = async (req, res, next) => {
  try {
    const {
      body: { nickname, realName, originDescription, catchPhrase },
      hero,
      images,
      superpowers,
    } = req;

    if (images) {
      await hero.addImages(images);
    }

    if (superpowers) {
      await hero.addSuperpowers(superpowers);
    }

    const updatedHero = await hero.update(
      {
        nickname,
        realName,
        originDescription,
        catchPhrase,
      },
      { returning: true },
    );

    res.status(200).send({ data: updatedHero });
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

    res.status(200).send({ data: 'Hero was deleted. Rest in peace' });
  } catch (err) {
    next(err);
  }
};

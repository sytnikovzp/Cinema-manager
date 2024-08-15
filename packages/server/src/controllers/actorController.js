const createError = require('http-errors');
const moment = require('moment');

const { Actor, Movie, Country, sequelize } = require('../db/models');

class ActorController {
  async getActors(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const actors = await Actor.findAll({
        attributes: ['id', 'full_name', 'photo'],
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
        ],
        raw: true,
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const actorsCount = await Actor.count();

      const formattedActors = actors.map((actor) => {
        return {
          id: actor.id,
          full_name: actor.full_name || '',
          photo: actor.photo || '',
          country: actor['Country.title'] || '',
        };
      });

      if (formattedActors.length > 0) {
        res.status(200).set('X-Total-Count', actorsCount).json(formattedActors);
      } else {
        next(createError(404, 'Actors not found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error.message);
    }
  }

  async getActorById(req, res, next) {
    try {
      const {
        params: { actorId },
      } = req;

      const actorById = await Actor.findByPk(actorId, {
        attributes: {
          exclude: ['countryId', 'country_id'],
        },
        include: [
          {
            model: Country,
            attributes: ['title'],
          },
          {
            model: Movie,
            attributes: ['id', 'title'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (actorById) {
        const actorData = actorById.toJSON();
        const formattedActor = {
          ...actorData,
          full_name: actorData.full_name || '',
          birth_date: actorData.birth_date || '',
          death_date: actorData.death_date || '',
          photo: actorData.photo || '',
          biography: actorData.biography || '',
          country: actorData.Country ? actorData.Country.title : '',
          movies: actorData.Movies || [],
          createdAt: moment(actorData.createdAt).format('DD-MM-YYYY HH:mm'),
          updatedAt: moment(actorData.updatedAt).format('DD-MM-YYYY HH:mm'),
        };

        delete formattedActor.Country;
        delete formattedActor.Movies;

        res.status(200).json(formattedActor);
      } else {
        console.log('Actor not found!');
        next(createError(404, 'Actor not found!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { full_name, country, birth_date, death_date, photo, biography } =
        req.body;

      const countryValue = country === '' ? null : country;

      const countryRecord = countryValue
        ? await Country.findOne({
            where: { title: countryValue },
            attributes: ['id'],
            raw: true,
          })
        : null;

      if (countryValue && !countryRecord) {
        throw new Error('Country not found');
      }

      const country_id = countryRecord ? countryRecord.id : null;
      console.log(`Country ID is: ${country_id}`);

      const newBody = {
        full_name,
        country_id,
        birth_date,
        death_date,
        photo,
        biography,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const newActor = await Actor.create(processedBody, {
        returning: ['id'],
        transaction: t,
      });

      if (newActor) {
        await t.commit();
        const { id } = newActor;
        return res.status(201).json({
          id,
          ...processedBody,
        });
      } else {
        await t.rollback();
        console.log(`The actor has not been created!`);
        next(createError(400, 'The actor has not been created!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async updateActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        id,
        full_name,
        country,
        birth_date,
        death_date,
        photo,
        biography,
      } = req.body;

      const countryValue = country === '' ? null : country;

      const countryRecord = countryValue
        ? await Country.findOne({
            where: { title: countryValue },
            attributes: ['id'],
            raw: true,
          })
        : null;

      if (countryValue && !countryRecord) {
        throw new Error('Country not found');
      }

      const country_id = countryRecord ? countryRecord.id : null;
      console.log(`Country ID is: ${country_id}`);

      const newBody = {
        full_name,
        country_id,
        birth_date,
        death_date,
        photo,
        biography,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedActor]] = await Actor.update(processedBody, {
        where: { id },
        returning: [
          'id',
          'full_name',
          'country_id',
          'birth_date',
          'death_date',
          'photo',
          'biography',
        ],
        transaction: t,
      });

      if (affectedRows > 0) {
        await t.commit();
        res.status(201).json(updatedActor);
      } else {
        await t.rollback();
        console.log(`The actor has not been updated!`);
        next(createError(400, 'The actor has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async patchActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { actorId },
        body: { full_name, country, birth_date, death_date, photo, biography },
      } = req;

      let country_id = null;
      if (country !== undefined) {
        if (country !== '') {
          const countryRecord = await Country.findOne({
            where: {
              title: country,
            },
            attributes: ['id'],
            raw: true,
          });

          if (!countryRecord) {
            throw new Error('Country not found');
          }

          country_id = countryRecord.id;
          console.log(`Country ID is: ${country_id}`);
        }
      }

      const newBody = {
        full_name,
        country_id,
        birth_date,
        death_date,
        photo,
        biography,
      };

      const replaceEmptyStringsWithNull = (obj) => {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === '' ? null : value,
          ])
        );
      };

      const processedBody = replaceEmptyStringsWithNull(newBody);

      const [affectedRows, [updatedActor]] = await Actor.update(processedBody, {
        where: {
          id: actorId,
        },
        returning: [
          'id',
          'full_name',
          'country_id',
          'birth_date',
          'death_date',
          'photo',
          'biography',
        ],
        transaction: t,
      });
      console.log(`Count of patched rows: ${affectedRows}`);

      if (affectedRows > 0) {
        await t.commit();
        res.status(200).json(updatedActor);
      } else {
        await t.rollback();
        console.log('The actor has not been updated!');
        next(createError(404, 'The actor has not been updated!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }

  async deleteActor(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const {
        params: { actorId },
      } = req;

      const delActor = await Actor.destroy({
        where: {
          id: actorId,
        },
        transaction: t,
      });

      if (delActor) {
        await t.commit();
        res.sendStatus(res.statusCode);
      } else {
        await t.rollback();
        console.log(`The actor has not been deleted!`);
        next(createError(400, 'The actor has not been deleted!'));
      }
    } catch (error) {
      console.log(error.message);
      await t.rollback();
      next(error);
    }
  }
}

module.exports = new ActorController();

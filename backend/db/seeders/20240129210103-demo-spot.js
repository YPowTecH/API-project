'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require('../models')
let options = { tableName: 'Spots'}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: 'Chapel of Anticipation',
        city: 'Stormveil Castle',
        state: 'Limgrave',
        country: 'Lands Between',
        lat: 80,
        lng: -179,
        name: 'Chapel of beginnings',
        description: 'Area where all tarnished begin their journey',
        price: 10.99
      },
      {
        ownerId: 2,
        address: 'South of Carian Study Hall',
        city: 'Liurnia',
        state: 'Liurnia of the Lakes',
        country: 'Lands Between',
        lat: 83,
        lng: -144,
        name: 'Jarburg',
        description: 'A peaceful village hidden on the side of a cliff. Home to many friendly Jars, who only wish to be left alone.',
        price: 300.99
      },
      {
        ownerId: 3,
        address: 'West of Three Sisters',
        city: 'Three Sisters',
        state: 'Liurnia of the Lakes',
        country: 'Lands Between',
        lat: 49,
        lng: -105,
        name: 'Ranni\'s Rise',
        description: 'A tower beset by large chunks of glintstone emerging from the ground and penetrating its interiors.',
        price: 999.99
      },
      {
        ownerId: 4,
        address: 'Foot of the Erdtree',
        city: 'Royal Capital',
        state: 'Leyndell',
        country: 'Lands Between',
        lat: 90,
        lng: -102,
        name: 'Leyndell, Royal Capital',
        description: 'Despite being partially destroyed by the dragon Gransax, it still holds strong to this day.',
        price: 150.99
      },
      {
        ownerId: 5,
        address: 'North of Consecrated Ground',
        city: 'Ordina',
        state: 'Consecrated Snowfield',
        country: 'Lands Between',
        lat: 90,
        lng: -63,
        name: 'Ordina, Liturgical Town',
        description: 'A long abandoned town in the snowfield.',
        price: 1.99
      },
      {
        ownerId: 6,
        address: 'Above the Siofra River',
        city: 'Eternal City',
        state: 'Underground',
        country: 'Lands Between',
        lat: 90,
        lng: -180,
        name: 'Nokron, Eternal City',
        description: 'An ancient city punished for high treason against the Greater Will',
        price: 500.99
      },
    ], options, { validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2,3,4,5,6]}
    })
  }
};

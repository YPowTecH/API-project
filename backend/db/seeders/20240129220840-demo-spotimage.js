'use strict';

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require('../models')
let options = { tableName: 'SpotImages'};
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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://imgur.com/a/0UjRChR',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://imgur.com/a/72WC8EQ',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://imgur.com/a/pEFOpHy',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://imgur.com/a/A22Mdr3',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://imgur.com/a/HE2gfix',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://imgur.com/a/aQOoP3f',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://imgur.com/a/t1ZFjxZ',
        preview: true
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
      spotId: { [Op.in]: [1,2,3,4,5,6]}
    })
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Review } = require('../models')
let options = { tableName: 'Reviews'}
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
    await Review.bulkCreate([
    {
      spotId:1,
      userId:1,
      review: 'I was suddenly ambushed by a grotesque Scion! Would not come again',
      stars: 1
    },
    {
      spotId:2,
      userId:3,
      review: 'Great place to relax with the local, Jar Bairn in particular is a great host',
      stars: 5
    },
    {
      spotId:6,
      userId:2,
      review: 'Hard to get to however the view is amazing. Well worth the travels',
      stars: 5
    },
    {
      spotId:5,
      userId:1,
      review: 'It\'s really really cold. Make sure you are well prepared.',
      stars: 2
    },
    {
      spotId:7,
      userId:1,
      review: 'Great place love it.',
      stars: 4
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
    }, {})
  }
};

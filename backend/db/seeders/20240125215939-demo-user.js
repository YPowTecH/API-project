'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = { tableName: 'Users'};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstname: 'demo',
        lastname: 'user',
        username: 'Demo-lition',
        firstname: 'Ryou',
        lastname:'Nishiyama',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstname: 'user',
        lastname: 'juan',
        username: 'FakeUser1',
        firstname: 'FakeName',
        lastname:'FakeLastName',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstname: 'user',
        lastname: 'dos',
        username: 'FakeUser2',
        firstname: 'FakeNameTwo',
        lastname:'FakeLastNameTwo',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], options, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

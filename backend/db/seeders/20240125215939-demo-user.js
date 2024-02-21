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
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName:'San',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'BigJarAlexander@user.io',
        username: 'IronFistJarrior',
        firstName: 'Alexander',
        lastName:'Warrior-Jar',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'CoolWolfDude@user.io',
        username: 'FaithfulShadow',
        firstName: 'Blaidd',
        lastName:'Half-Wolf',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true }).catch(err=>{
      console.log('catch',err)
      throw err
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

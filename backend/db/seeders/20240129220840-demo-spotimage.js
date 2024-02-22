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
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708389051/ELDEN%20LOUNGE/Chapel%20of%20Beginnings/Elden-Ring-Chapel-Of-Anticipation_ufhqxt.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708389432/ELDEN%20LOUNGE/Chapel%20of%20Beginnings/about-the-courtyard-near-the-chapel-of-anticipation-v0-4zh0u0uj2psb1_mq45di.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708389224/ELDEN%20LOUNGE/Chapel%20of%20Beginnings/Elden-Ring-VR-Mod-3-860x484_t5o6wp.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708389139/ELDEN%20LOUNGE/Chapel%20of%20Beginnings/43d475e656c5e35572200c26090fdd31_m8mgyy.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708389233/ELDEN%20LOUNGE/Chapel%20of%20Beginnings/Elden-Ring-Screenshot-2022.02.25-20.35.03.87-1024x576_lvrc5j.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708379654/ELDEN%20LOUNGE/jarburg/EagbrX2_inafoh.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708445958/ELDEN%20LOUNGE/jarburg/latest_oarqol.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708445813/ELDEN%20LOUNGE/jarburg/if9qrwcmbqn91_sgda1w.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708445943/ELDEN%20LOUNGE/jarburg/elden-ring-pot-boys_bjqwux.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708445924/ELDEN%20LOUNGE/jarburg/Elden_Ring_Screenshot_2022.03.09_-_22.47.28.23_dqf6js.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708379659/ELDEN%20LOUNGE/Ranni%27s%20Rise/7ffkBN3_sx8j8l.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446512/ELDEN%20LOUNGE/Ranni%27s%20Rise/latest_pul3nj.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446524/ELDEN%20LOUNGE/Ranni%27s%20Rise/unknown_p6043nx_thumb.detail_frxboz.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446561/ELDEN%20LOUNGE/Ranni%27s%20Rise/rennas_rise_locations_elden_ring_wiki_guide_zqdnec.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446572/ELDEN%20LOUNGE/Ranni%27s%20Rise/latest_lr1w5x.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708379664/ELDEN%20LOUNGE/Leyndell%2C%20Royal%20Capital/1g1JkKu_cpsrdf.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446855/ELDEN%20LOUNGE/Leyndell%2C%20Royal%20Capital/Elden_Ring_Screenshot_2022.03.23_-_21.28.47.21_egoj2j.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708446864/ELDEN%20LOUNGE/Leyndell%2C%20Royal%20Capital/leyndell-royal-capital-in-game-pic-v0-56l9sf1crm391_qjybce.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708447567/ELDEN%20LOUNGE/Leyndell%2C%20Royal%20Capital/QxzSY2p_tintjc.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708447156/ELDEN%20LOUNGE/Leyndell%2C%20Royal%20Capital/elden-ring-progression-leyndell-royal-capital_fyeb3b.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708379669/ELDEN%20LOUNGE/Ordina%2C%20Liturgical%20Town/kC2h8su_z99jpl.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448328/ELDEN%20LOUNGE/Ordina%2C%20Liturgical%20Town/invisible-warrior-location_jwapwp.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448076/ELDEN%20LOUNGE/Ordina%2C%20Liturgical%20Town/Ordina_Icon_jgkogz.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448037/ELDEN%20LOUNGE/Ordina%2C%20Liturgical%20Town/Elden_Ring_Screenshot_2022.03.28_-_21.17.02.16_jhrltd.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448020/ELDEN%20LOUNGE/Ordina%2C%20Liturgical%20Town/is-there-any-lore-to-the-liturgical-town-of-ordina-v0-b1fy4e4vdcra1_lzu7d6.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708379675/ELDEN%20LOUNGE/Nokron%20Eternal%20City/h3gQG1H_gp3db6.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448774/ELDEN%20LOUNGE/Nokron%20Eternal%20City/53786296-1688319282_htoayx.webp',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448571/ELDEN%20LOUNGE/Nokron%20Eternal%20City/3rs0xbsa9ss81_bumyha.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448661/ELDEN%20LOUNGE/Nokron%20Eternal%20City/nokron__the_eternal_city_by_fadinember_df2gl7k-pre.jpg_gktkbc.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dxdktlvbj/image/upload/v1708448754/ELDEN%20LOUNGE/Nokron%20Eternal%20City/Nokron-Eternal-City-Featured-Image-v2_y5dqt5.jpg',
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

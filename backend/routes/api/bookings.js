const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');
const router = express.Router()

//Get all current User's Bookings
router.get('/current', requireAuth, async (req,res)=>{
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userId: userId
        }

    })
    // const spots = await Spot.findAll({
    //     where: {
    //         ownerId: ownerId
    //     }
    // })
    // const imgurl = await SpotImage.findOne({
    //     where: {
    //         spotId: spots[i].id
    //     }
    // })

    // if (imgurl === null) {
    //     spots[i].setDataValue('previewImage', null)
    // } else {
    //     spots[i].setDataValue('previewImage', imgurl.url)
    // }

    res.json({
        Bookings: bookings
    })
})


//edit a booking
router.put('/:bookingId', requireAuth, async (req,res)=>{

})

//delete aa booking
router.delete('/:bookingId', requireAuth, async (req,res)=>{

})

module.exports = router

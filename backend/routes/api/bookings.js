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
        }, include: [
            {
                model:Spot,
                attributes:{
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            }
        ]

    })

    for(let i=0; i< bookings.length; i++){
        let json = bookings[i].toJSON()
        // console.log(json)

        const previewimage = await SpotImage.findOne({
            where:{
                spotId: json.Spot.id,
                preview: true
            }
        })
        // console.log(previewimage)

        if(previewimage){
            json.Spot.previewImage = previewimage.url
        } else {
            json.Spot.previewImage = null
        }

        bookings[i] = json
    }

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

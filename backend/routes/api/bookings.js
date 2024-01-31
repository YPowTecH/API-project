const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');
const router = express.Router()

//Get all current User's Bookings
router.get('/current', requireAuth, async (req,res)=>{
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    
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

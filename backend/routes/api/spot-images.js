const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router()

router.delete('/:imageId', requireAuth, async (req, res)=>{
    const { imageId } = req.params
    const spotImg = await SpotImage.findByPk(imageId)

    if(!spotImg){
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    const spot = await Spot.findByPk(spotImg.spotId)

    if(!spot){
        return res.status(403).json({
            message:"Forbidden"
        })
    }

    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            message:"Forbidden"
        })
    }


    await spotImg.destroy()

    res.json({
        message:"Successfully deleted"
    })
})



module.exports = router

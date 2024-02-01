const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router()

router.delete('/:imageId', requireAuth, async (req, res)=>{
    const { imageId } = req.params
    const spotImg = await SpotImage.findByPk(imageId)
    const spot = await Spot.findByPk(spotImg.spotId)

    if(!spotImg){
        return res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    if(!spot){
        return res.status(404).json({
            message:"Spot must belong to the current user"
        })
    }

    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            message:"Spot must belong to the current user"
        })
    }


    await spotImg.destroy()

    res.json({
        message:"Successfully deleted"
    })
})



module.exports = router

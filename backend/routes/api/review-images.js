const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router()

router.delete('/:imageId', requireAuth, async (req, res)=>{
    const { imageId } = req.params
    const reviewImg = await ReviewImage.findByPk(imageId)

    if(!reviewImg){
        return res.status(404).json({
            message:"Review Image couldn't be found"
        })
    }

    const review = await Review.findByPk(reviewImg.reviewId)

    // console.log(review)


    if(!review){
        return res.status(404).json({
            message:"Review must belong to the current user"
        })
    }

    if(req.user.id !== review.userId){
        return res.status(403).json({
            message:"Review must belong to the current user"
        })
    }

    await reviewImg.destroy()

    res.json({
        message:"Successfully deleted"
    })
})

module.exports = router

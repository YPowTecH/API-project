const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require ('../../db/models')
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router()

const validateSpots = [
check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street Address required'),
check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
check('state')
    .exists({ checkFalsy: true})
    .withMessage('State is required'),
check('country')
    .exists({ checkFalsy: true})
    .withMessage('Country is required'),
check('lat')
    .isFloat({ min:-90, max:90 })
    .withMessage("Latitude must be within -90 and 90"),
check('lng')
    .isFloat({ min:-180, max:180 })
    .withMessage("Longitude must be within -180 and 180"),
check('name')
    .isLength({ max:49 })
    .withMessage("Name must be less than 50 characters"),
check('description')
    .exists({ checkFalsy: true})
    .withMessage("Description is required"),
check('price')
    .isFloat({ min:0 })
    .withMessage("Price per day must be a positive number")
]

const validateReviews = [
check('review')
    .exists({ checkFalsy: true})
    .withMessage("Review text is required"),
check('stars')
    .exists({ checkFalsy: true})
    .withMessage("Stars must be an integer from 1 to 5")
]

//Add query filters to get all spots
const validateQueryFilter = [

]

router.get('/', validateQueryFilter, async(req, res)=>{
    const spots = await Spot.findAll()
    let avgRating
    for(let i=0; i<spots.length;i++){
        let reviews = await Review.count({
            where:{
                spotId: spots[i].id
            }
        })
        let stars = await Review.sum('stars', {
            where:{
                spotId: spots[i].id
            }
        })
    if(stars===null){
        avgRating = 0
    }else{
        avgRating = totalStars / reviews
    }

    spots[i].setDataValue('avgRating', avgRating)

    }

    res.json({
        Spot: spots,
    })
})

module.exports = router

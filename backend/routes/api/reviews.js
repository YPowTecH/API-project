const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check } = require('express-validator');


const router = express.Router()

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5")
        .isInt({min: 1, max: 5}),
    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res)=>{
    const userId = req.user.id
    const reviews = await Review.findAll({
        where: {
            userId: userId
        }
    })

    const user = await User.findAll({
        attributes:[
        "id",
        "firstname",
        "lastname"
    ]

    })

    const spots = await Spot.findAll({
        attributes:{
            exclude: ['createdAt', "updatedAt", "description"]
        }
    })

    const spotimg = await SpotImage.findAll({
        group: "spotId"
    })

    const reviewimages = await ReviewImage.findAll({
        attributes:[
            "id",
            "url"
        ]
    })

    const resp = []

    reviews.forEach((review)=> resp.push(review.toJSON()))

    let i = 0
    while(i<resp.length){
        let spot = spots[i].toJSON()
        resp[i].User = user[i]
        resp[i].Spot = spot
        spot.previewImage = spotimg[i].url
        resp[i].ReviewImages = [reviewimages[i]]
    i++
    }

    res.json({
        Reviews: resp
    })
})





module.exports = router

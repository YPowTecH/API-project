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
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: {
                    model: SpotImage,
                    where: {
                        preview: true
                    }, attributes: ['url']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    for (let i = 0; i < reviews.length; i++) {
        let json = reviews[i].toJSON();
        let spotURL = json.Spot.SpotImages[0]


        if (spotURL) {
            json.Spot.previewImage = spotURL.url
        } else {
            json.Spot.previewImage = null
        }
        if(json.Spot.lat){
            json.Spot.lat = parseFloat(json.Spot.lat)
        }
        if(json.Spot.lng){
            json.Spot.lng = parseFloat(json.Spot.lng)
        }
        if(json.Spot.price){
            json.Spot.price = parseFloat(json.Spot.price)
        }
        //deletes url
        delete json.Spot.SpotImages
        reviews[i] = json
    }

    res.json({
        Reviews: reviews
    })
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body

    const review = await Review.findByPk(reviewId)

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== review.userId) {
        res.status(403).json({
            message: "Forbidden"
        })
    }
    //findall instead of findone
    const existImg = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (existImg.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }

    const resp = await ReviewImage.create({
        reviewId: reviewId,
        url
    })

    res.json({
        id: resp.id,
        url: resp.url
    })
})

//edit a review
router.put('/:reviewId', [requireAuth, validateReviews], async (req, res) => {
    const { review, stars } = req.body

    const { reviewId } = req.params
    const reviewspot = await Review.findByPk(reviewId)

    if (!reviewspot) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== reviewspot.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if (review) {
        reviewspot.review = review
    }

    if (stars) {
        reviewspot.stars = stars
    }

    await reviewspot.save()

    res.json(reviewspot)

})

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    let review = await Review.findByPk(reviewId)

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found"
        })
    }

    if (req.user.id !== review.userId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await review.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })

})







module.exports = router

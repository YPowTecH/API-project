const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const spot = require('../../db/models/spot');

const router = express.Router()

const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Street Address required'),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be within -90 and 90"),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be within -180 and 180"),
    check('name')
        .isLength({ max: 49 })
        .isString()
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Description is required"),
    check('price')
        .isFloat({ min: 0 })
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
]

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

//Add query filters to get all spots
const validateQueryFilter = [

]
//Get all spots by logged user
router.get('/current', requireAuth, async (req, res) => {
    const ownerId = req.user.id
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })
    //avgstarrating
    let avgRating
    for (let i = 0; i < spots.length; i++) {
        let reviews = await Review.count({
            where: {
                spotId: spots[i].id
            }
        })
        let stars = await Review.sum('stars', {
            where: {
                spotId: spots[i].id
            }
        })
        if (stars === null) {
            avgRating = 0
        } else {
            avgRating = stars / reviews
        }

        spots[i].setDataValue('avgRating', avgRating)

        //previewimgurl
        const imgurl = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })

        if (imgurl === null) {
            spots[i].setDataValue('previewImage', null)
        } else {
            spots[i].setDataValue('previewImage', imgurl.url)
        }

    }

    res.json({
        Spots: spots,
    })
})
// Add an Image to a Spot based on Spot ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }

    //proper auth
    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            "message": "Spot must belong to the current user"
        })
    }

    const spotImage = await SpotImage.create({
        spotId: spotId.id,
        url,
        preview
    })

    res.json(spotImage)
})

// Get Spot details by ID
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

//numreviews, avgstaarrating,spotimages[],owner

    const numReviews = await Review.count({
        where: {
            spotId: spotId
        }
    })

    const stars = await Review.sum('stars', {
        where: {
            spotId: spotId
        }
    })

    let avgRating
    if (stars === null) {
        avgRating = 0
    } else {
        avgRating = stars / numReviews
    }

    const imgurl = await SpotImage.findAll({
        where: {
            spotId: spotId
        }, attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstname', 'lastname']
    })

    spot.setDataValue('numReviews', numReviews)
    spot.setDataValue('avgStarRating', avgRating)
    spot.setDataValue('SpotImages', imgurl)
    spot.setDataValue('Owner', owner)



    res.json(spot)
})

//Edit a spot
router.put('/:spotId', [requireAuth, validateSpots], async (req,res)=>{
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //proper auth
    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            "message": "Spot must belong to the current user"
        })
    }

    if(address){
        spot.address = address
    }
    if(city){
        spot.city = city
    }
    if(state){
        spot.state = state
    }
    if(country){
        spot.country = country
    }
    if(lat){
        spot.lat = lat
    }
    if(lng){
        spot.lng = lng
    }
    if(name){
        spot.name = name
    }
    if(description){
        spot.description = description
    }
    if(price){
        spot.price = price
    }

    await spot.save()

    res.json(spot)

})


// DESTROY
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    let spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //proper auth
    if(req.user.id !== spot.ownerId){
        return res.status(403).json({
            "message": "Spot must belong to the current user"
        })
    }

    spot.destroy()

    res.status(200).json({
        message: "Successfully deleted"
    })
})


// Spot Create
router.post('/', [requireAuth, validateSpots], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(spot)

})


// Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    //avgstarrating
    let avgRating
    for (let i = 0; i < spots.length; i++) {
        let reviews = await Review.count({
            where: {
                spotId: spots[i].id
            }
        })
        let stars = await Review.sum('stars', {
            where: {
                spotId: spots[i].id
            }
        })
        if (stars === null) {
            avgRating = 0
        } else {
            avgRating = stars / reviews
        }

        spots[i].setDataValue('avgRating', avgRating)

        //previewimgurl
        const imgurl = await SpotImage.findOne({
            where: {
                spotId: spots[i].id
            }
        })

        if (imgurl === null) {
            spots[i].setDataValue('previewImage', null)
        } else {
            spots[i].setDataValue('previewImage', imgurl.url)
        }

    }

    res.json({
        Spots: spots,
    })
})



module.exports = router

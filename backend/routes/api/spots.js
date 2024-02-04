const express = require('express')
const { Spot, SpotImage, Review, User, Booking, ReviewImage } = require('../../db/models')
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation')
const { Op, UnknownConstraintError } = require('sequelize');
const { check, query } = require('express-validator');

const router = express.Router()

const validateSpots = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .withMessage('Street Address required'),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
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
        .notEmpty()
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
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validateDates = [
    check('startDate')
        .exists({ checkFalsy: true })
        .custom((val, { req }) => {
            const currentDate = new Date()
            if (new Date(val) < currentDate) {
                throw new Error("StartDate cannot be in the past")
            }
            return true
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((val, { req }) => {
            const startDate = new Date(req.body.startDate)
            if (new Date(val) <= startDate) {
                throw new Error("endDate cannot be on or before startDate")
            }
            return true
        }),
    handleValidationErrors
]


const validateQueryFilters = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1"),
    query('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1"),
    query('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage("Maximum latitude is invalid"),
    query('minLat')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Minimum latitude is invalid"),
    query('minLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Maximum longitude is invalid"),
    query('maxLng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage("Minimum longitude is invalid"),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
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
        if (spots[i].lat) {
            spots[i].setDataValue('lat', parseFloat(spots[i].lat))
        }
        if (spots[i].lng) {
            spots[i].setDataValue('lng', parseFloat(spots[i].lng))
        }
        if (spots[i].price) {
            spots[i].setDataValue('price', parseFloat(spots[i].price))
        }
    }

    res.json({
        Spots: spots,
    })
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        }, include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    res.json({
        Reviews: allReviews
    })
})

//create a review
router.post('/:spotId/reviews', [requireAuth, validateReviews], async (req, res) => {
    const { review, stars } = req.body
    const { spotId } = req.params
    //const spotId = await Spot.findByPk(req.params.spotId)
    const spot = await Spot.findByPk(spotId)

    const existReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spotId
        }
    })

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    if (existReview) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    const post = await Review.create({
        spotId: +spotId,
        userId: req.user.id,
        review,
        stars
    })
    // console.log('should be an integer', post)
    res.status(200).json(post)
})


//Get all bookings for a Spot based on Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //are owner
    if (req.user.id === spot.ownerId) {
        const allbookings = await Booking.findAll({
            where: {
                spotId: spotId
            }, include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
            ]
        })
        return res.json({
            Bookings: allbookings
        })

    }
    //arent owner
    if (req.user.id !== spot.ownerId) {
        const allbookings = await Booking.findAll({
            where: {
                spotId: spotId
            }, attributes: {
                exclude: ["id", "userId", "createdAt", "updatedAt"]
            }
        })
        return res.json({
            Bookings: allbookings
        })
    }


    res.json()
})


//create a booking from a spot based on spot's id
router.post('/:spotId/bookings', [requireAuth, validateDates], async (req, res) => {
    const { spotId } = req.params
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //if owner of spot
    if (req.user.id === spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    //if already booked for specified dates
    const existBooking = await Booking.findOne({
        where: {
            spotId: spotId,
            [Op.and]:
                [
                    {
                        startDate: {
                            [Op.lte]: new Date(endDate)
                        }
                    },
                    {
                        endDate: {
                            [Op.gte]: new Date(startDate)
                        }
                    }
                ]
        }
    })

    if (existBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    const createBooking = await Booking.create({
        spotId: +spotId,
        userId: req.user.id,
        startDate,
        endDate
    })
    return res.json(createBooking)
})

// Add an Image to a Spot based on Spot ID
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //proper auth
    if (req.user.id !== spotId.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const spotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    })

    res.json({
        id: spotImage.id,
        url: spotImage.url,
        preview: spotImage.preview
    })
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
        attributes: ['id', 'firstName', 'lastName']
    })

    spot.setDataValue('numReviews', numReviews)
    spot.setDataValue('avgStarRating', avgRating)
    spot.setDataValue('SpotImages', imgurl)
    spot.setDataValue('Owner', owner)
    if (spot.lat) spot.lat = parseFloat(spot.lat)
    if (spot.lng) spot.lng = parseFloat(spot.lng)
    if (spot.price) spot.price = parseFloat(spot.price)


    res.json(spot)
})

//Edit a spot
router.put('/:spotId', [requireAuth, validateSpots], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    }

    //proper auth
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if (address) {
        spot.address = address
    }
    if (city) {
        spot.city = city
    }
    if (state) {
        spot.state = state
    }
    if (country) {
        spot.country = country
    }
    if (lat) {
        spot.lat = lat
    }
    if (lng) {
        spot.lng = lng
    }
    if (name) {
        spot.name = name
    }
    if (description) {
        spot.description = description
    }
    if (price) {
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
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden"
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

    if (spot.lat) spot.lat = parseFloat(lat)
    if (spot.lng) spot.lng = parseFloat(lng)
    if (spot.price) spot.price = parseFloat(price)

    res.status(201).json(spot)

})


// Get all spots
router.get('/', validateQueryFilters, async (req, res) => {
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let pagination = {}
    const queryObj = {
        where: {

        }
    }
    if (!page) page = 1
    if (!size) size = 20
    if (page > 10) page = 10
    if (size > 20) size = 20

    pagination.limit = size
    pagination.offset = size * (page - 1)

    if (parseInt(size) <= 0 || page <= 0) {
        delete pagination.page
        delete pagination.size
    }

    if (minLat) {
        queryObj.where.lat = { [Op.gte]: minLat }
    }

    if (maxLat) {
        queryObj.where.lat = { [Op.lte]: maxLat }
    }

    if (minLat && maxLat) {
        queryObj.where.lat = { [Op.between]: [minLat, maxLat] }
    }

    if (minLng) {
        queryObj.where.lng = { [Op.gte]: minLng }
    }

    if (maxLng) {
        queryObj.where.lng = { [Op.lte]: maxLng }
    }

    if (minLng && maxLng) {
        queryObj.where.lng = { [Op.between]: [minLng, maxLng] }
    }

    if (minPrice) {
        queryObj.where.price = { [Op.gte]: minPrice }
    }

    if (maxPrice) {
        queryObj.where.price = { [Op.lte]: maxPrice }
    }

    const spots = await Spot.findAll({
        ...pagination,
        ...queryObj
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

        if (!imgurl) {
            spots[i].setDataValue('previewImage', null)
        } else {
            spots[i].setDataValue('previewImage', imgurl.url)
        }

        if (spots[i].lat) {
            spots[i].setDataValue('lat', parseFloat(spots[i].lat))
        }
        if (spots[i].lng) {
            spots[i].setDataValue('lng', parseFloat(spots[i].lng))
        }
        if (spots[i].price) {
            spots[i].setDataValue('price', parseFloat(spots[i].price))
        }
    }




    res.json({
        Spots: spots,
        page: parseInt(page),
        size: parseInt(size)
    })
})



module.exports = router

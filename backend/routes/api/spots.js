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

router.get(
    '/'
)

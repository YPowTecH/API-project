import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { csrfFetch } from './csrf';

//Constant
const ALL_SPOTS = '/spots/ALL_SPOTS'
const SPOT_DETAILS = '/spots/SPOT_DETAILS'
const CREATE_SPOT = '/spots/CREATE_SPOT'
const CREATE_SPOT_IMAGE = '/spots/CREATE_SPOT_IMAGE'
const UPDATE_SPOT = '/spots/UPDATE_SPOT'
const DELETE_SPOT = '/spots/DELETE_SPOT'
const UPDATE_SPOT_IMAGE = '/spots/UPDATE_IMAGE'

//Action Creators
const loadSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots
    }
}

const spotDetails = (spot) => {
    return {
        type: SPOT_DETAILS,
        spot
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const createSpotImage = (spot) => {
    return {
        type: CREATE_SPOT_IMAGE,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const updateImage = (spot) => {
    return {
        type: UPDATE_SPOT_IMAGE,
        spot
    }
}

//Thunks
export const thunkLoadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const data = await response.json()
        console.log('data=>', data)
        dispatch(loadSpots(data))
        return data
    }
}

export const thunkSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json()
        dispatch(spotDetails(spot))
        return spot
    }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(createSpot(spot))
        return spot
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkCreateSpotImage = (spotId, images) => async (dispatch) => {
    // console.log('spotId=>>>', spotId)
    // console.log('images=>>>', images)

    const imgArray = []
    for (let image of images) {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: image, preview: true })
        })

        if (response.ok) {
            const spot = await response.json()
            dispatch(createSpotImage(spot))
            imgArray.push(image)
        } else {
            const error = await response.json()
            return error
        }
    }
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    // console.log('spotid=>', spot)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(deleteSpot(spotId))
        return spot
    }
}

export const thunkUpdateSpot = (updatedSpot, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSpot)
    })

    if (response.ok) {
        dispatch(updateSpot(spotId))
    } else {
        const error = await response.json()
        return error
    }
}

export const thunkUpdateImage = (updatedSpot, images) => async (dispatch) => {
    const imgArray = []
    for (let image of images) {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: image, preview: true })
        })
        if (response.ok) {
            const spot = await response.json()
            dispatch(updateImage(spot))
            imgArray.push(image)
        } else {
            const error = await response.json()
            return error
        }
    }
}

//Reducers
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_SPOTS: {
            const newState = {}
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState
        }
        case SPOT_DETAILS: {
            return { ...state, [action.spot.id]: action.spot }
        }
        case CREATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot }
        }
        case DELETE_SPOT: {
            const newState = { ...state }
            delete newState[action.spotId]
            return newState
        }
        case UPDATE_SPOT: {
            return { ...state, [action.spot.id]: action.spot };
        }
        // case UPDATE_SPOT_IMAGE: {
        //     return { ...state, [action.spot.id]: action.spot}
        // }
        // case CREATE_SPOT_IMAGE: {
        //     return { ...state, [action.spot.id]: action.spot }
        // }
        default:
            return state
    }
}



export default spotsReducer

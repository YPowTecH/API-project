import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { csrfFetch } from './csrf';

//constant
const ALL_SPOTS = '/spots/ALL_SPOTS'
const SPOT_DETAILS = '/spots/SPOT_DETAILS'

//Action Creators
const loadSpots = (spots) =>{
    return{
        type: ALL_SPOTS,
        spots
    }
}

const spotDetails = (spot)=>{
    return{
        type: SPOT_DETAILS,
        spot
    }
}



//Thunks
export const thunkLoadSpots = () => async(dispatch)=>{
    const response = await fetch('/api/spots')

    if(response.ok){
        const data = await response.json()

        dispatch(loadSpots(data))
        return data
    }
}

export const thunkSpotDetails = (spotId) => async(dispatch)=>{
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok){
        const spot= await response.json()
        dispatch(spotDetails(spot))
        return spot
    }
}

//Reducers
const spotsReducer = (state = {}, action)=>{
    switch(action.type){
        case ALL_SPOTS:{
            const newState={}
            action.spots.Spots.forEach((spot)=>(newState[spot.id]=spot))
            return newState
        }
        case SPOT_DETAILS:{
            return { ...state, [action.spot.id]: action.spot }
        }
        default:
            return state
    }
}



export default spotsReducer

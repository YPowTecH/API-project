import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";

//constant
const ALL_SPOTS = '/spots/ALL_SPOTS'


//Action Creators
const loadSpots = (spots) =>{
    return{
        type: ALL_SPOTS,
        spots
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

//Reducers
const spotsReducer = (state = {}, action)=>{
    switch(action.type){
        case ALL_SPOTS:{
            const newState={}
            action.spots.Spots.forEach((spot)=>(newState[spot.id]=spot))
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer

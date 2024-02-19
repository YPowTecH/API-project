import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadSpots } from "../../store/spots"

import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch()
    const spotsList = useSelector((state)=>Object.values(state.spots))
    console.log('my spots', spotsList)


    useEffect(()=>{
        dispatch(thunkLoadSpots())
    }, [dispatch])
    return (
        <>
            <div className="tile-container">
                {spots.map((spot)=>(
                    <div className="tile" title={spot.name}>
                    <img></img>
                    <div className="review">stars</div>
                    <div className="location">city, state</div>
                    <div className="price">price</div>
                </div>
                ))}
            </div>
        </>
    )
}

export default LandingPage

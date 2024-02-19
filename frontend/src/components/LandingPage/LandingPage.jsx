import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadSpots } from "../../store/spots"
import { NavLink } from "react-router-dom"
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch()
    const spots = useSelector((state) => Object.values(state.spots))
    console.log('my spots', spots)


    useEffect(() => {
        dispatch(thunkLoadSpots())
    }, [dispatch])


    return (
        <>
            <div className="spots-container">
                {spots.map((spot) => (
                    <NavLink className= 'spot-container' to={`/spots/${spot.id}`}>
                        <div className="title" title={spot.name} key={spot.id}>
                            <img id='spots.img' src={`${spot.previewImage}`}/>
                            <div className="review">★</div>
                            <div className="location">{`${spot.city}`}, {`${spot.state}`}</div>
                            <div className="price">{`${spot.price}`}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
}

export default LandingPage

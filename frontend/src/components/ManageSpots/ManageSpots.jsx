import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadSpots } from "../../store/spots"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteSpot from "../DeleteSpot/DeleteSpot"
import './ManageSpots.css'

const ManageSpots = () => {
    const dispatch = useDispatch()
    const currUser = useSelector((state) => state.session.user)
    console.log('curr....', currUser)
    const spots = useSelector((state) => state.spots)
    const spotsArray = Object.values(spots)
    console.log('spotsarraray', spotsArray)
    console.log('spots...', spots)
    const ownerSpots = spotsArray.filter((spot) => spot.ownerId === currUser.id)
    console.log('do i own these', ownerSpots)



    //create new ref for refresh

    useEffect(() => {
        dispatch(thunkLoadSpots())
    }, [dispatch])

    // const DeleteSpot = (spotId) =>{
    //     dispatch(thunkDeleteSpot(spotId))
    // }

    return (
        <div className='ManageSpot-container'>
            <div className='Title-container'>
                <h1 className='MS-title'>Manage Spots</h1>
                {ownerSpots.length === 0 && (<button className='Create-btn'>
                    <NavLink to='/spots/new' className='Create-btn-text'>
                        Create a New Spot
                    </NavLink>
                </button>)}
            </div>

            <div className='Spots-container'>
                {ownerSpots.map((spot) => (
                    <div key={spot.id}>
                        <NavLink className='MG-Nav-container' to={`/spots/${spot.id}`} key={spot.id}>
                            <div className="Spot-container" title={spot.name} >
                                <img className='image' src={`${spot.previewImage}`} />
                                <div className='Review-location-container'>
                                    <div className="location">{`${spot.city}`}, {`${spot.state}`}</div>
                                    <div className="review">★{spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}</div>
                                </div>
                                <div className="price">{`$${spot.price} night`}</div>
                            </div>
                        </NavLink>
                        <div className='MG-Btn-container'>
                            <NavLink className='Update-btn' to={`/spots/${spot.id}/edit`}>Update</NavLink>
                            <OpenModalButton
                                buttonText='Delete'
                                className='Delete-btn'
                                modalComponent={<DeleteSpot spot={spot} />}
                            />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}



export default ManageSpots

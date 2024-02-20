import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSpotDetails } from '../../store/spots'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    console.log('my spot here===>', spot)
    const imgArray = spot?.SpotImages
    console.log('imgarr', imgArray)
    useEffect(() => {
        if (!spot) {
            dispatch(thunkSpotDetails(spotId))
        }
        dispatch(thunkSpotDetails(spotId))
    }, [dispatch, spotId])

    if (!spot) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='Header-container'>
                <h2>{spot?.name}</h2>
                <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            </div>
            <div className='Image-container'>
                <img className='BigImage' src={imgArray[0].url} />
                <div className='SmallImage-container'>
                    {imgArray && imgArray.slice(1).map((img)=>(
                    <img className='SmallImages' src={img?.url}/>
                    ))}
                </div>
            </div>
            <div className='Description-container'>
                <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
            </div>
            <div className='Reviews-container'>
                <div className='Review'>
                    FirstName
                    Date
                </div>
            </div>

        </>
    )

}
export default SpotDetails

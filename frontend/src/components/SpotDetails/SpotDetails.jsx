import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSpotDetails } from '../../store/spots'
import { thunkLoadReviews } from '../../store/reviews'
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    // console.log('my spot here===>', spot)
    const review = useSelector((state) => state.reviews)
    console.log('reviews => ', review)
    const reviewArray = Object.values(review)
    console.log('rev arr=>', reviewArray)
    const imgArray = spot?.SpotImages
    // console.log('imgarr', imgArray)
    useEffect(() => {
        dispatch(thunkSpotDetails(spotId));
        dispatch(thunkLoadReviews(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot.SpotImages) {
        return <div>Loading...</div>
    }

    const reserveBtn = (e) => {
        e.preventDefault();
        alert("Feature coming soon");
    };

    return (
        <>
            <div className='Header-container'>
                <h2>{spot?.name}</h2>
                <div className='Location'>
                    <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
                </div>
            </div>
            <div className='Image-container' >
                <img className='BigImage' src={imgArray[0].url} />
                <div className='SmallImage-container'>
                    {imgArray && imgArray.slice(1).map((img) => (
                        <img className='SmallImages' src={img?.url} />
                    ))}
                </div>
            </div>
            <div className='Blurb-container'>
                <div className='Description-container'>
                    <div className='Host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <p className='Paragraph'>{spot.description}</p>
                </div>
                <div className='Callout-container'>
                    <div className='PRR-container'>
                        <div className='price'><span style={{ fontSize: '1.5em' }}>${spot.price}</span> night</div>
                        <div>
                            ★{spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(1) : 'New'}
                            {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'Review' : 'Reviews'}`}
                        </div>
                    </div>
                    <button className="Reserve-button" onClick={reserveBtn}>
                        Reserve
                    </button>
                </div>
            </div>


            <div className='ReviewTitle-container'>
                <h2>
                    ★{spot.avgStarRating > 0 ? spot.avgStarRating.toFixed(1) : 'New'}
                    {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'Review' : 'Reviews'}`}
                </h2>
            </div>
            <div className='Reviews-container'>
                <div className='Review'>

                </div>
            </div>

        </>
    )

}
export default SpotDetails

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSpotDetails } from '../../store/spots'
import { thunkLoadReviews } from '../../store/reviews'
import SpotReviews from '../SpotReviews/SpotReviews'
import ReviewForm from '../ReviewForm/ReviewForm'
import { useModal } from '../../context/Modal'

import './SpotDetails.css'
import OpenModalButton from '../OpenModalButton'


function SpotDetails() {
    const { spotId } = useParams()
    // const { setOnModalClose } = useModal()
    console.log('modal==>', useModal())
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    console.log('my spot here===>', spot)
    const review = useSelector((state) => state.reviews)
    // console.log('reviews => ', review)
    const reviewArray = Object.values(review)
    // console.log('rev arr=>', reviewArray)
    const imgArray = spot?.SpotImages
    // console.log('imgarr', imgArray)
    const currUser = useSelector((state) => state.session.user)
    console.log('curruser=>', currUser)

    function isOwner(currUser) {
        let currUserIsOwner
        if (currUser && spot?.Owner) {
            currUserIsOwner = currUser?.id === spot?.Owner.id
            return currUserIsOwner
        }
    }
    console.log('isOwner', isOwner(currUser))

    // const currUserIsOwner = currUser?.id === spot?.Owner.id
    // console.log('currUserOwner', currUserIsOwner)
    useEffect(() => {
        dispatch(thunkSpotDetails(spotId))
        console.log('Before dispatch:', review);
        dispatch(thunkLoadReviews(spotId))
        console.log('After dispatch:', review)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, spotId, reviewArray.length]) //reviewArray.length

    if (!spot || !spot.SpotImages) {
        return <div>Loading...</div>
    }

    const reserveBtn = (e) => {
        e.preventDefault();
        alert("Feature coming soon");
    };

    //has a review alr
    const hasReview = Object.values(review).find((review) =>
        review.userId === currUser?.id && review.spotId === parseInt(spotId)
        // isOwner(currUser) === true && review.spotId === parseInt(spotId)
    )
    console.log('review', review)
    console.log('hasreview=>', hasReview)

    return (
        <>
            <div className='Header-container'>
                <h2>{spot?.name}</h2>
                <div className='Location'>
                    <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
                </div>
            </div>
            <div className='Image-container' >
                <img className='BigImage' src={spot?.SpotImages && imgArray[0].url} />
                <div className='SmallImage-container'>
                    {imgArray && imgArray.slice(1).map((img) => (
                        <div key={img.id}>
                            <img className='SmallImages' src={img?.url} />
                        </div>
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
            <div className='Post-review'>
                {currUser && !isOwner(currUser) && !hasReview &&
                    (<OpenModalButton
                        className='Button'
                        buttonText='Post Your Review'
                        modalComponent={<ReviewForm spotId={spotId} />} />
                    )}
            </div>
            <div className='Reviews-container'>
                <div className='Review'>
                    <SpotReviews  />
                    {/* spotId = { spotId } */}
                </div>
            </div>

        </>
    )

}
export default SpotDetails

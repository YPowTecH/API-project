import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadReviews } from '../../store/reviews'
import './SpotReviews.css'

function SpotReviews() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.reviews)
    // console.log('reviewObj', reviews)
    const reviewArray = Object.values(reviews).filter((review) => review.spotId === parseInt(spotId))
    // console.log('reviewArray=>', reviewArray)
    // console.log('spotid', spotId)

    const loggedUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadReviews(spotId))
    }, [dispatch, spotId])

    if (!reviewArray.length) {
        return <div className= 'No-review'>Be the first to post a review!</div>
    }

    console.log(reviewArray[0].createdAt)
    //dates
    function formatDate(date){
        const newDate = new Date(date)
        const options = { month: 'long', year: 'numeric'}
        return newDate.toLocaleDateString(undefined, options)
    }

    return (
        <>
            <div className='Reviews-container'>
                {reviewArray.map((review) => (
                    <div key={review.id}>
                        <div className='Review-container'>
                            <h2 className='Name'>{review.User?.firstName}</h2>
                            <div className='date'>
                                <p className='date-month'>{formatDate(review.createdAt)}</p>
                            </div>
                            <p className='review'>{review.review}</p>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SpotReviews

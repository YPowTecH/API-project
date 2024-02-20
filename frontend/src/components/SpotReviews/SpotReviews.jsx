import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadReviews } from '../../store/reviews'
import './SpotReviews.css'

function SpotReviews(){
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const review = useSelector((state)=>state.reviews)
    console.log('reviews => ', review)
    const reviewArray = Object.values(review)
    console.log('rev arr=>', reviewArray)



    useEffect(()=>{
        dispatch(thunkSpotDetails(spotId))
    }, [dispatch, spotId])

    if(!review.length){
        return <div>Be the first to post a review!</div>
    }

    return(
        <>
            
        </>
    )
}

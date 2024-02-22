import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkCreateReview } from '../../store/reviews'
import { thunkLoadReviews } from '../../store/reviews'
import { thunkLoadSpots } from '../../store/spots'
// import { useNavigate } from 'react-router-dom'
import './ReviewForm.css'

const ReviewForm = ({ spotId }) => {
    const dispatch = useDispatch()
    // const navi = useNavigate()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(null)
    const [hover, setHover] = useState(null)
    const [validations, setValidations] = useState({})
    const { closeModal } = useModal()
    const [submitted, setSubmitted] = useState(false)

    // console.log('modal',useModal())
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        const formData = {
            review,
            stars
        }
        try {
            await dispatch(thunkCreateReview(spotId, formData));
            await dispatch(thunkLoadReviews(spotId));
            closeModal();
        } catch (error) {
            setValidations({ message: "Review already exists for this spot" });
            console.error("Error creating review:", error);
        }

      await dispatch(thunkLoadReviews(spotId))
     }

    return (
        <form onSubmit={handleSubmit} className='Review-form'>
            <h1 className='title'>How was your stay?</h1>
            {"message" in validations && <p>{validations.message}</p>}
            <textarea
                type='text'
                name='review'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder='Leave your review here...'
                rows={7}
                cols={70}
            />

            <div className='Stars-field'>
                {[1, 2, 3, 4, 5].map((star, i) => {
                    const ratingValue = i + 1
                    return (
                        <label key={i}>
                            <span
                                className='Stars'
                                onClick={() => setStars(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            >
                                {ratingValue <= (hover || stars) ? '★' : '☆'}
                            </span>
                        </label>
                    )
                })}
            </div>
            <div className ='Btn-container'>
            <button type='submit' className='Submit-btn' disabled={review.length<10 || stars < 1}>Submit Your Review</button>
            </div>
        </form>
    )
}

export default ReviewForm;

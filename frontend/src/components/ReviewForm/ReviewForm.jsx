import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkCreateReview } from '../../store/reviews'
import { thunkLoadReviews } from '../../store/reviews'
import './ReviewForm.css'

const ReviewForm = ({ spotId }) => {
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(null)
    const [hover, setHover] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(onSubmit({  }))
        closeForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>

        </form>
    )
}

export default ReviewForm;

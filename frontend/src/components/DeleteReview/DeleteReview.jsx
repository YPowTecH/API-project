import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import './DeleteReview.css'

const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const onDelete = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteReview(reviewId))
        closeModal()
    }

    return (
        <div className='Delete-Modal-container'>
            <div className='Del-R-text-container'>
                <h1 className='Del-R-title'>Confirm Delete</h1>
                <p className='Del-R-text'>Are you sure you want to delete this review?</p>
            </div>
            <div className='Del-R-btn-container'>
                <button className='Del-R-btn' onClick={onDelete}>
                    Yes (Delete Review)
                </button>
                <button className='Del-R-btn2' onClick={closeModal}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )

}

export default DeleteReview

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
            <div className='text-container'>
                <h1 className='title'>Confirm Delete</h1>
                <p className='text'>Are you sure you want to remove this review?</p>
            </div>
            <div className='btn-container'>
                <button className='btn' onClick={onDelete}>
                    Yes (Delete Review)
                </button>
                <button className='btn2' onClick={closeModal}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    )

}

export default DeleteReview

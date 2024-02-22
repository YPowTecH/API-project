import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkDeleteSpot } from '../../store/spots'
import './DeleteSpot.css'

const DeleteSpot = ({spot}) =>{
    const dispatch=useDispatch()
    const { closeModal } = useModal()

    const onDelete=(e)=>{
        e.preventDefault()
        dispatch(thunkDeleteSpot(spot))
        closeModal()
    }

    return(
        <div className='Delete-Modal-container'>
            <div className='text-container'>
                <h1 className='title'>Confirm Delete</h1>
                <p className='text'>Are you sure you want to remove this spot?</p>
            </div>
            <div className='btn-container'>
                <button className='btn' onClick={onDelete}>
                    Yes (Delete Spot)
                </button>
                <button className='btn2' onClick={closeModal}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    )
}

export default DeleteSpot

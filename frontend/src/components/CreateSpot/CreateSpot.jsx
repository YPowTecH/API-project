import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateSpot } from "../../store/spots";

import './CreateSpot.css'

const CreateSpot = () => {
    const dispatch = useDispatch()
    const navi = useNavigate()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [img0, setImg0] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const validationsObject = {}
        if (!country) {
            validationsObject.country = 'Country is required'
          }

        if(!address) {
            validationsObject.address = 'Address is required'
        }

        if(!city) {
            validationsObject.city = 'City is required'
        }

        if(!state) {
            validationsObject.state = 'State is required'
        }

        if(description.length < 30) {
            validationsObject.description = 'Description needs 30 or more characters'
        }

        if(!name) {
            validationsObject.name = 'Name is required'
        }

        if(!price) {
            validationsObject.price = 'Price per night is required'
        }

        if(!img1) {
            validationsObject.img0 = 'Image is required'
        }

        setValidations(validationsObject)
    }, [country, address, city, state, description, name, price, img0, img1, img2, img3, img4])

    const handleSubmit = async (e) => {
        e.preventDefault()

        navi('/')
    }

    return (
        <div className='Form-container'>
            <form className='Form' onSubmit={handleSubmit}>
                <h1 className='Title'>Create a New Spot</h1>
                <div className='Section1'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation</p>
                    <div>
                        <label>Country</label>
                        <input type='text' name='country' placeholder='Enter a country'></input>
                    </div>
                    {'country' in validations && (<p>{validations.country}</p>)}
                    <div>
                        <label>Street Address</label>
                        <input type='text' name='address' placeholder='Enter an address'></input>
                    </div>
                    <div>
                        <label>City</label>
                        <input type='text' name='city' placeholder='Enter a city'></input>
                    </div>
                    <div>
                        <label>State</label>
                        <input type='text' name='state' placeholder='Enter a state'></input>
                    </div>
                    <div>
                        <label>Latitude</label>
                        <input type='text' name='lat' placeholder='Enter a latitude'></input>
                    </div>
                    <div>
                        <label>Longitude</label>
                        <input type='text' name='lng' placeholder='Enter a longitude'></input>
                    </div>
                </div>
                <div className='Section2'>
                    <h2>Describe your place to guests</h2>
                    <p>Describe your place to guests", a caption of "Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea name='description' placeholder='Please write at least 30 characters' rows='4' cols='50'></textarea>
                </div>
                <div className='Section3'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' name='name' placeholder='Name of your spot'></input>
                </div>
                <div className='Section4'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input type='number' name='price' placeholder='Price per night (USD)'></input>
                </div>
                <div className='Section5'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type='text' name='img0' placeholder='Preview Image URL'></input>
                    <input type='text' name='img1' placeholder='Image URL'></input>
                    <input type='text' name='img2' placeholder='Image URL'></input>
                    <input type='text' name='img3' placeholder='Image URL'></input>
                    <input type='text' name='img4' placeholder='Image URL'></input>
                </div>
                <div className='Submit-button'>
                    <button type="submit">Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSpot

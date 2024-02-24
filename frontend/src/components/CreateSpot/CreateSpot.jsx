import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateSpot } from "../../store/spots";
import { thunkCreateSpotImage } from "../../store/spots";

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
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {

        const validationsObject = {}
        if (!country) {
            validationsObject.country = 'Country is required'
        }

        if (!address) {
            validationsObject.address = 'Address is required'
        }

        if (!city) {
            validationsObject.city = 'City is required'
        }

        if (!state) {
            validationsObject.state = 'State is required'
        }

        if (description.length < 30) {
            validationsObject.description = 'Description needs 30 or more characters'
        }

        if (!name) {
            validationsObject.name = 'Name is required'
        }

        if (!price) {
            validationsObject.price = 'Price per night is required'
        }

        if (!img0 || !validImg(img0)) {
            validationsObject.img0 = 'Atleast 1 image is required and must end with .png, .jpg, or .jpeg'
        }

        if (img1 && !validImg(img1)) {
            validationsObject.img1 = 'Image URL must end with .png, .jpg, or .jpeg'
        }

        if (img2 && !validImg(img2)) {
            validationsObject.img2 = 'Image URL must end with .png, .jpg, or .jpeg'
        }

        if (img3 && !validImg(img3)) {
            validationsObject.img3 = 'Image URL must end with .png, .jpg, or .jpeg'
        }

        if (img4 && !validImg(img4)) {
            validationsObject.img4 = 'Image URL must end with .png, .jpg, or .jpeg'
        }

        setValidations(validationsObject)

    }, [country, address, city, state, description, name, price, img0, img1, img2, img3, img4])

    const validImg = (url) => {
        const fileType = ['.png', '.jpg', '.jpeg']
        const newUrl = url.toLowerCase()
        return fileType.some(type => newUrl.endsWith(type))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        console.log(Object.keys(validations))
        if (!Object.keys(validations).length) {
            const spot = await dispatch(
                thunkCreateSpot({
                    country,
                    address,
                    city,
                    state,
                    description,
                    name,
                    price,
                    lat,
                    lng,
                })

            ).catch(async (res) => {
                const data = await res.json()
                if (data.errors) {
                    setValidations(data.errors)
                }
            })
            console.log('spot->', spot)
            const imgArray = [img0, img1, img2, img3, img4]
            await dispatch(thunkCreateSpotImage(spot.id, imgArray))
            navi(`/spots/${spot.id}`)
        }
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
                        <input type='text' name='country' placeholder='Enter a country' value={country} onChange={(e)=>setCountry(e.target.value)}></input>
                    </div>
                    <div className='Form-errors'>
                    {submitted && 'country' in validations && (<p>{validations.country}</p>)}
                    </div>
                    <div>
                        <label>Street Address</label>
                        <input type='text' name='address' placeholder='Enter an address' value={address} onChange={(e)=>setAddress(e.target.value)}></input>
                    </div>
                    <div className='Form-errors'>
                    {submitted && 'address' in validations && (<p>{validations.address}</p>)}
                    </div>
                    <div>
                        <label>City</label>
                        <input type='text' name='city' placeholder='Enter a city' value={city} onChange={(e)=>setCity(e.target.value)}></input>
                    </div>
                    <div className='Form-errors'>
                    {submitted && 'city' in validations && (<p>{validations.city}</p>)}
                    </div>
                    <div>
                        <label>State</label>
                        <input type='text' name='state' placeholder='Enter a state' value={state} onChange={(e)=>setState(e.target.value)}></input>
                    </div>
                    <div className='Form-errors'>
                    {submitted && 'state' in validations && (<p>{validations.state}</p>)}
                    </div>
                    <div>
                        <label>Latitude</label>
                        <input type='text' name='lat' placeholder='Enter a latitude' value={lat} min={-90} max={90} onChange={(e)=>setLat(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Longitude</label>
                        <input type='text' name='lng' placeholder='Enter a longitude' value={lng} min={-180} max={180} onChange={(e)=>setLng(e.target.value)}></input>
                    </div>
                </div>
                <div className='Section2'>
                    <h2>Describe your place to guests</h2>
                    <p>Describe your place to guests", a caption of "Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea name='description' placeholder='Please write at least 30 characters' rows='10' cols='100' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className='Form-errors'>
                {submitted && 'description' in validations && (<p>{validations.description}</p>)}
                </div>

                <div className='Section3'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' name='name' placeholder='Name of your spot' value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className='Form-errors'>
                {submitted && 'name' in validations && (<p>{validations.name}</p>)}
                </div>

                <div className='Section4'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div>
                    $ <input type='number' name='price' placeholder='Price per night (USD)' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                    </div>
                </div>
                <div className='Form-errors'>
                {submitted && 'price' in validations && (<p>{validations.price}</p>)}
                </div>

                <div className='Section5'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type='text' name='img0' placeholder='Preview Image URL' value={img0} onChange={(e)=>setImg0(e.target.value)}></input>
                    <div className='Form-errors'>
                    {submitted && 'img0' in validations && (<p>{validations.img0}</p>)}
                    </div>
                    <input type='text' name='img1' placeholder='Image URL'value={img1} onChange={(e)=>setImg1(e.target.value)}></input>
                    <div className='Form-errors'>
                    {submitted && 'img1' in validations && (<p>{validations.img1}</p>)}
                    </div>
                    <input type='text' name='img2' placeholder='Image URL'value={img2} onChange={(e)=>setImg2(e.target.value)}></input>
                    <div className='Form-errors'>
                    {submitted && 'img2' in validations && (<p>{validations.img2}</p>)}
                    </div>
                    <input type='text' name='img3' placeholder='Image URL'value={img3} onChange={(e)=>setImg3(e.target.value)}></input>
                    <div className='Form-errors'>
                    {submitted && 'img3' in validations && (<p>{validations.img3}</p>)}
                    </div>
                    <input type='text' name='img4' placeholder='Image URL'value={img4} onChange={(e)=>setImg4(e.target.value)}></input>
                    <div className='Form-errors'>
                    {submitted && 'img4' in validations && (<p>{validations.img4}</p>)}
                    </div>
                </div>
                <div className='Submit-button'>
                    <button type="submit">Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default CreateSpot

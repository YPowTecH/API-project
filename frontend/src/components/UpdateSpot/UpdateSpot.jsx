import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { thunkUpdateImage } from "../../store/spots";
import { thunkUpdateSpot, thunkSpotDetails } from "../../store/spots";

import './UpdateSpot.css'

const UpdateSpot = () => {
    const dispatch = useDispatch()
    const navi = useNavigate()
    const { spotId } = useParams()
    const spot = useSelector((state => state.spots[spotId]))
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [img0, setImg0] = useState('')
    const [img1, setImg1] = useState(spot?.img1)
    const [img2, setImg2] = useState(spot?.img2)
    const [img3, setImg3] = useState(spot?.img3)
    const [img4, setImg4] = useState(spot?.img4)
    const [validations, setValidations] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // const spotImage = useSelector((state)=> state.spots?.SpotImages[0])
    // console.log('spotImage=>', spotImage)

    // const spotImagesArray = spot.SpotImages
    // console.log('spotsImgArr', spotImagesArray)
    console.log('spot=>', spot?.SpotImages)



    // useEffect(() => {
    //     setImg0(spot?.SpotImages[0]?.url)
    // }, [spot?.length, spot?.SpotImages, spot?.SpotImages?.length])


    useEffect(() => {

        dispatch(thunkSpotDetails(spotId))

        // setImg0(spot?.SpotImages[0]?.url)
        // console.log('spotimgarray=>',spotImagesArray)
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

        console.log('description=>', description)

        if (description && description.length < 30) {
            validationsObject.description = 'Description needs 30 or more characters'
        }

        if (!name) {
            validationsObject.name = 'Name is required'
        }

        if (!price) {
            validationsObject.price = 'Price per night is required'
        }

        // if (!img0 || !validImg(img0)) {
        //     validationsObject.img0 = 'Atleast 1 image is required and must end with .png, .jpg, or .jpeg'
        // }

        // if (img1 && !validImg(img1)) {
        //     validationsObject.img1 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }

        // if (img2 && !validImg(img2)) {
        //     validationsObject.img2 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }

        // if (img3 && !validImg(img3)) {
        //     validationsObject.img3 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }

        // if (img4 && !validImg(img4)) {
        //     validationsObject.img4 = 'Image URL must end with .png, .jpg, or .jpeg'
        // }

        setValidations(validationsObject)



    }, [spot?.SpotImages?.length, country, address, city, state, description, name, price, img0, img1, img2, img3, img4])

    // if (!spot || !spot.SpotImages) {
    //     return <div>Loading...</div>
    // }


    const validImg = (url) => {
        const fileType = ['.png', '.jpg', '.jpeg']
        const newUrl = url.toLowerCase()
        return fileType.some(type => newUrl.endsWith(type))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        // console.log(Object.keys(validations))
        if (!Object.keys(validations).length) {
            const updateSpot = await dispatch(
                thunkUpdateSpot({
                    country,
                    address,
                    city,
                    state,
                    description,
                    name,
                    price,
                    lat,
                    lng,
                }, spotId)

            ).catch(async (res) => {
                const data = await res.json()
                if (data.errors) {
                    setValidations(data.errors)
                }
            })
            console.log('spot->', spot)
            // const imgArray = [img0, img1, img2, img3, img4]
            // await dispatch(thunkUpdateImage(spotId, imgArray))
            navi(`/spots/${spotId}`)
        }
    }



    return (
        spot && spot?.SpotImages?.length > 0 && (
            <>
                <div className='Form-container'>
                    <form className='Form' onSubmit={handleSubmit}>
                        <h1 className='Title'>Update your Spot</h1>
                        <div className='Section1'>
                            <h2>Where's your place located?</h2>
                            <p className='Form-desc'>Guests will only get your exact address once they booked a reservation</p>
                            <div>
                                <label>Country</label>
                            </div>
                            <input type='text' name='country' placeholder='Enter a country' value={country} onChange={(e) => setCountry(e.target.value)}></input>
                            <div className='Form-errors'>
                                {submitted && 'country' in validations && (<p>{validations.country}</p>)}
                            </div>
                            <div>
                                <label>Street Address</label>
                            </div>
                            <input type='text' name='address' placeholder='Enter an address' value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            <div className='Form-errors'>
                                {submitted && 'address' in validations && (<p>{validations.address}</p>)}
                            </div>

                            <div className='Inline-label'>
                                <div>
                                    <label className='Text-above-label'>City</label>
                                    <input className='City-input' type='text' name='city' placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)}></input>
                                    <div className='Form-errors'>
                                        {submitted && 'city' in validations && (<p>{validations.city}</p>)}
                                    </div>
                                </div>

                                <div>
                                    <label className='Text-above-label Text-above-label-adjust'>State</label>
                                    <div>, &nbsp;&nbsp;
                                        <input type='text' name='state' placeholder='Enter a state' value={state} onChange={(e) => setState(e.target.value)}></input>
                                    </div>
                                    <div className='Form-errors'>
                                        {submitted && 'state' in validations && (<p>{validations.state}</p>)}
                                    </div>
                                </div>
                            </div>
                            <div className='Inline-label'>
                                <div>
                                    <label className='Text-above-label'>Latitude</label>
                                    <input className='Lat-Lon-input' type='text' name='lat' placeholder='Enter a latitude' value={lat} min={-90} max={90} onChange={(e) => setLat(e.target.value)}></input>
                                </div>
                                <div>
                                    <label className='Text-above-label Text-above-label-adjust'>Longitude</label>
                                    <div>, &nbsp;&nbsp;<input className='Lat-Lon-input' type='text' name='lng' placeholder='Enter a longitude' value={lng} min={-180} max={180} onChange={(e) => setLng(e.target.value)}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='Section-line' />
                        <div className='Section2'>
                            <h2>Describe your place to guests</h2>
                            <p className='Form-desc'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                            <textarea name='description' placeholder='Please write at least 30 characters' rows='10' cols='100' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className='Form-errors'>
                            {submitted && 'description' in validations && (<p>{validations.description}</p>)}
                        </div>
                        <hr className='Section-line' />
                        <div className='Section3'>
                            <h2>Create a title for your spot</h2>
                            <p className='Form-desc'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                            <input className='Input-rest' type='text' name='name' placeholder='Name of your spot' value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div className='Form-errors'>
                            {submitted && 'name' in validations && (<p>{validations.name}</p>)}
                        </div>
                        <hr className='Section-line' />
                        <div className='Section4'>
                            <h2>Set a base price for your spot</h2>
                            <p className='Form-desc'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                            <div>
                                $ <input className='Input-rest' type='number' name='price' placeholder='Price per night (USD)' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                        </div>
                        <div className='Form-errors'>
                            {submitted && 'price' in validations && (<p>{validations.price}</p>)}
                        </div>
                        <hr className='Section-line' />
                        <div className='Section5'>
                            <h2>Liven up your spot with photos</h2>
                            <p className='Form-desc'>Submit a link to at least one photo to publish your spot.</p>
                                {spot.SpotImages.map((spotimg) => (
                                    <input className='Input-rest' type='text' name='img0' placeholder='Preview Image URL' value={spotimg.url} onChange={(e) => setImg0(e.target.value)}></input>
                                ))}

                            {/* <input className='Input-rest' type='text' name='img0' placeholder='Preview Image URL' value={img0} onChange={(e) => setImg0(e.target.value)}></input>
                        <div className='Form-errors'>
                            {submitted && 'img0' in validations && (<p>{validations.img0}</p>)}
                        </div>
                        <input className='Input-rest' type='text' name='img1' placeholder='Image URL' value={img1} onChange={(e) => setImg1(e.target.value)}></input>
                        <div className='Form-errors'>
                            {submitted && 'img1' in validations && (<p>{validations.img1}</p>)}
                        </div>
                        <input className='Input-rest' type='text' name='img2' placeholder='Image URL' value={img2} onChange={(e) => setImg2(e.target.value)}></input>
                        <div className='Form-errors'>
                            {submitted && 'img2' in validations && (<p>{validations.img2}</p>)}
                        </div>
                        <input className='Input-rest' type='text' name='img3' placeholder='Image URL' value={img3} onChange={(e) => setImg3(e.target.value)}></input>
                        <div className='Form-errors'>
                            {submitted && 'img3' in validations && (<p>{validations.img3}</p>)}
                        </div>
                        <input className='Input-rest' type='text' name='img4' placeholder='Image URL' value={img4} onChange={(e) => setImg4(e.target.value)}></input>
                        <div className='Form-errors'>
                            {submitted && 'img4' in validations && (<p>{validations.img4}</p>)}
                        </div> */}
                        </div>
                        {/* <hr className='Section-line' /> */}
                        <div className='Submit-button'>
                            <button className='Submit-btn' type="submit">Update your Spot</button>
                        </div>
                    </form>
                </div>
            </>
        )
    )
}

export default UpdateSpot

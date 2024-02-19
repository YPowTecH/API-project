import { useEffect } from "react"
import './LandingPage.css'

function LandingPage() {
    return (
        <>
            <div className="tile-container">
                <div className="tile">
                    <img></img>
                    <div className="review">stars</div>
                    <div className="location">city, state</div>
                    <div className="price">price</div>
                </div>
            </div>
        </>
    )
}

export default LandingPage

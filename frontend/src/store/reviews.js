import { csrfFetch } from './csrf';

//constant
const ALL_REVIEWS = '/reviews/ALL_REVIEWS'
const CREATE_REVIEW = '/reviews/CREATE_REVIEWS'
const DELETE_REVIEW = '/reviews/DELETE_REVIEWS'

//action creators
export const loadReviews = (reviews) => ({
    type: ALL_REVIEWS,
    reviews
})

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const deleteReview = (reviewId) => {
    return{
        type: DELETE_REVIEW,
        reviewId
    }
}


//thunks
export const thunkLoadReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const data = await response.json()

        // console.log('data===>', data)
        dispatch(loadReviews(data))
        return data
    }
}

export const thunkCreateReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json()
        dispatch(createReview(review))
        return review
    } else {
        const error = await response.json()
        return error
    }


}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReview(reviewId))
    }
}

//reducers
const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_REVIEWS: {
            const newState = {}
            action.reviews.forEach((review) => (newState[review.id] = review))
            return newState
        }
        case CREATE_REVIEW: {
            return { ...state, [action.review.id]: action.review }
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState
        }
        default:
            return state
    }
}


export default reviewsReducer

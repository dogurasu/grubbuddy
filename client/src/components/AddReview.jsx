import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useHistory } from "react-router-dom";

const AddReview = () => {
    const { id } = useParams();
    const location = useLocation(); // this location hook gives us access to the id of the restaurant page we are on right now
    const history = useHistory();
    // console.log(id);

    // make it controlled -> use the useState hook x3 for the input field
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            // don't rlly need to store data
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                "name": name,
                "review_text": reviewText,
                "rating": rating
            });
            // console.log(response);
            history.push("/");
            history.push(location.pathname); // doesn't do anything (if we add a new review, it doesn't show up); thus we need to route to another page and then route back to trigger a refresh
        } catch(err) {

        }
    }
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            placeholder="name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            id="rating"
                            className="custom-select"
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea 
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        id="Review"
                        className="form-control"
                    ></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddReview;
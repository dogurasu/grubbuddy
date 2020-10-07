import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
    
    const { id } = useParams(); // destructure useParams to get the parameters of the restaurant ??

    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    // we're going to refresh the page to get new review, calc and present avg rating
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                // retrieve the data of the restaurant and store it in this state variable w/ 'setSelectedRestaurant'
                console.log(response);
                setSelectedRestaurant(response.data.data); // tell the rest of our application what was the selected restaurant
            } catch(err) {
            console.log(err); // see what response is
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {selectedRestaurant && (
                <>
                <h1 className="text-center display-1">
                        {selectedRestaurant.restaurant.name}
                </h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews} />
                </div>
                <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage;
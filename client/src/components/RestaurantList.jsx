import React, {useEffect, useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/"); // returns a promise, so we want to use await
                setRestaurants(response.data.data.restaurants); // call setRestaurants to save our state and store our restaurants w/in our state
                // console.log(response);
            } catch(err) {}
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }));
        } catch(err) {
        }
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* // if restaurants exist (means if we successfully fetched our data and then stored it into our context), we will run the rest of this code */}
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td>
                                    <button className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>Mcdonalds</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Mcdonalds</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
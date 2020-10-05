import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

// what we use to wrap our entire application so that they all have access to our state

export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]); // default value is empty array useState([])

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    }

    // in JS syntax, whenever the key and the value are the same, you can just remove the colon (restaurants: restaurants -> restaurants)
    return (
        <RestaurantsContext.Provider
            value={{restaurants: restaurants, setRestaurants: setRestaurants, addRestaurants}}
        > 
            {props.children}
        </RestaurantsContext.Provider>
    )
}
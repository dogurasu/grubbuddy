import React from 'react';

const StarRating = ({rating}) => {
    // stars is an array that will contain all of the indivdual stars (filled, empty, half)
    const stars = [];
    for (let i = 0; i < 5; ++i) {
        if (i < rating) {
            stars.push(<i key={i} className="fas fa-star text-warning"></i>)
        } else if (i === Math.ceil(rating) && Number.isInteger(rating)) { // 2 checks: if 'i' == ceiling of that value and if it's a decimal
            // in this case, call a stars.push on half a star
            stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>)
        } else {
            stars.push(<i key={i} className="far fa-star text-warning"></i>);
        }
    }
    return (
        <>
        {stars}
        </>
    )
}

export default StarRating;
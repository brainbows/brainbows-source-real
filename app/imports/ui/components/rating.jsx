import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Rating = ({ id, defaultValue, onChange }) => {
  const [ratings, setRatings] = useState([]);
  const [value, setValue] = useState(defaultValue || 0);

  const handleClick = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ratings.push({ id, value });
    setRatings([...ratings]);
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) {
      return 0; // Return 0 if no ratings yet
    }
    const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return total / ratings.length;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`rating-${id}`}>Rate this student:</label>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              <label htmlFor={`star-${id}-${ratingValue}`} className="star-wrapper" key={`star-${id}-${ratingValue}`}>
                <input
                  type="radio"
                  id={`star-${id}-${ratingValue}`}
                  name={`rating-${id}`}
                  value={ratingValue}
                  checked={ratingValue === value}
                  onChange={() => handleClick(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={ratingValue <= value ? '#ffc107' : '#e4e5e9'}
                  size={20}
                />
              </label>
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Rating:</h2>
        <p>{calculateAverageRating().toFixed(1)} <FaStar className="star" size={10} />&apos;s</p>
      </div>
    </div>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};
export default Rating;

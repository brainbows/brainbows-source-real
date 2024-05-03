import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Rating = ({ defaultValue, onChange }) => {
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
    const newRating = {
      value,
      date: new Date().toISOString(),
    };
    setRatings([...ratings, newRating]);
    setValue(defaultValue || 0);
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
        <label htmlFor="rating">Rate this student:</label>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              <label htmlFor={`star-${ratingValue}`} className="star-wrapper">
                <input
                  type="radio"
                  id={`star-${ratingValue}`}
                  name="rating"
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
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};
export default Rating;

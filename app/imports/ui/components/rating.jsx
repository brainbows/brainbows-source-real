import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Rating = ({ id, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue || 0);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Retrieve ratings from localStorage on component mount
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    setRatings(storedRatings[id] || []);
  }, [id]);

  const handleClick = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedRatings = [...ratings, value];
    setRatings(updatedRatings);
    // Update localStorage with new ratings
    const updatedLocalStorage = { ...JSON.parse(localStorage.getItem('ratings')), [id]: updatedRatings };
    localStorage.setItem('ratings', JSON.stringify(updatedLocalStorage));
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) {
      return 0; // Return 0 if no ratings yet
    }
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };

  const handleRefreshAverage = () => {
    // Clear ratings and localStorage
    setRatings([]);
    const updatedLocalStorage = { ...JSON.parse(localStorage.getItem('ratings')), [id]: [] };
    delete updatedLocalStorage[id];
    localStorage.setItem('ratings', JSON.stringify(updatedLocalStorage));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`rating-${id}`}>Rate this student:</label>
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;

            return (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={handleRefreshAverage}>Clear and Reset Average</button>
      </form>
      <div>
        <h2>Rating:</h2>
        <p>{calculateAverageRating().toFixed(1)} <FaStar className="star" size={10} />{'\''}s</p>
      </div>
    </div>
  );
};

Rating.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  defaultValue: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  onChange: PropTypes.func,
};

export default Rating;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './rating';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudentsAdmin = ({ studentsAdmin }) => {
  const [rating, setRating] = useState(null);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <Card className="h-100">
      <Card.Header>
        <Image src={studentsAdmin.image} width={75} />
        <Card.Title>{studentsAdmin.name}</Card.Title>
        <Card.Subtitle>{studentsAdmin.level}</Card.Subtitle>
        <Card.Subtitle>{studentsAdmin.grasshopper}</Card.Subtitle>
        <Card.Subtitle>{studentsAdmin.sensei}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{studentsAdmin.description}</Card.Text>
        <Rating defaultValue={rating} id={studentsAdmin._id} onChange={handleRatingChange} />
        <p>Selected Rating: {rating}</p>
        <Link to={`/chat?studentId=${studentsAdmin._id}`}>
          <button type="submit">chat with student</button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
StudentsAdmin.propTypes = {
  studentsAdmin: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    image: PropTypes.string,
    level: {
      type: String,
      allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
    },
    grasshopper: {
      type: Array,
    },
    'grasshopper.$': {
      type: String,
      allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
    },
    sensei: {
      type: Array,
    },
    'sensei.$': {
      type: String,
      allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
    },
    description: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentsAdmin;

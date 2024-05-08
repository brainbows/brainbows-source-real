import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Image } from 'react-bootstrap';
import Rating from './rating';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Student = ({ students }) => {
  const [rating, setRating] = useState(null);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <Col>
      <Card className="h-100">
        <Card.Header>
          <Image src={students.image} width={75} />
          <Card.Title>{students.name}</Card.Title>
          <Card.Subtitle>Year: {students.level} </Card.Subtitle>
          <Card.Subtitle>Grasshopper Class: {students.grasshopper} </Card.Subtitle>
          <Card.Subtitle>Can Teach: {students.sensei} </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>{students.description}</Card.Text>
          <Rating defaultValue={rating} id={students._id} onChange={handleRatingChange} />
          <p>Selected Rating: {rating}</p>
        </Card.Body>
        <Card.Footer className="d-grid fluid">
          <Button type="submit">Recruit!!!</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

// Require a document to be passed to this component.
Student.propTypes = {
  students: PropTypes.shape({
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

export default Student;

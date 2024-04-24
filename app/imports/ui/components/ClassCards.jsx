import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClassCards = ({ contact }) => (
  <Card>
    <Card.Header>
      <Card.Title>{contact.course}</Card.Title>
      <Card.Body>
        <Card.Subtitle>Senseis: </Card.Subtitle>
        <Card.Text>{contact.sensei}</Card.Text>
        <Card.Subtitle>Grasshoppers: </Card.Subtitle>
        <Card.Text>{contact.grasshopper}</Card.Text>
      </Card.Body>
    </Card.Header>
  </Card>
);

// Require a document to be passed to this component.
ClassCards.propTypes = {
  contact: PropTypes.shape({
    course: PropTypes.string,
    grasshopper: PropTypes.arrayOf(PropTypes.string),
    sensei: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default ClassCards;

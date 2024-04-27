import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfessorCards = ({ contact }) => (
  <Card>
    <Card.Header>
      <Image src={contact.image} width={75} />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>Room: </Card.Subtitle>
      <Card.Text>{contact.address}</Card.Text>
      <Card.Subtitle>Courses Taught: </Card.Subtitle>
      <Card.Text>{contact.courses}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle>Office Hours: </Card.Subtitle>
      <Card.Text>{contact.officeHours}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfessorCards.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    courses: PropTypes.string,
    officeHours: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfessorCards;

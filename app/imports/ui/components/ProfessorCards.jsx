import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Nav, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfessorCards = ({ professor }) => (
  <Col className="h-100">
    <Card className="h-100">
      <Card.Header>
        <Image src={professor.image} width={75} />
        <Card.Title>{professor.name}</Card.Title>
        <Card.Subtitle>Room: </Card.Subtitle>
        <Card.Text>{professor.room}, {professor.roomLocation}</Card.Text>
        <Card.Subtitle>Courses Taught: </Card.Subtitle>
        <Card.Text>{professor.coursesTaught}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>Office Hours: </Card.Subtitle>
        <Card.Text>{professor.days}: {professor.startTime} - {professor.endTime}</Card.Text>
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Link className="h-100" to={`/edit-professor/${professor._id}`}>Edit</Link>
        ) : ''}
      </Card.Body>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
ProfessorCards.propTypes = {
  professor: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    room: PropTypes.string,
    roomLocation: PropTypes.string,
    image: PropTypes.string,
    coursesTaught: {
      type: String,
      allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
    },
    days: {
      type: String,
      allowedValues: ['M', 'T', 'W', 'R', 'F'],
    },
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfessorCards;

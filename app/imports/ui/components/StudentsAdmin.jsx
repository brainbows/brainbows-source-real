import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudentsAdmin = ({ studentsAdmin }) => (
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
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StudentsAdmin.propTypes = {
  studentsAdmin: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
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
  }).isRequired,
};

export default StudentsAdmin;

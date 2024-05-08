import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Student = ({ students }) => (
  <Col className="p-3 fluid">
    <Card className="h-200">
      <Card.Header>
        <Image src={students.image} width="230px" height="230px" rounded />
        <Card.Title>{students.name}</Card.Title>
        <Card.Subtitle>Year: {students.level} </Card.Subtitle>
        <Card.Subtitle>Grasshopper Classes: {students.grasshopper} </Card.Subtitle>
        <Card.Subtitle>Can Teach: {students.sensei} </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{students.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

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
  }).isRequired,
};

export default Student;

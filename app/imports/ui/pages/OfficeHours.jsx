import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Professors } from '../../api/professor/Professor';
import ProfessorCards from '../components/ProfessorCards';

/* Renders a table containing all of the Student documents. Use <StudentItem> to render each row. */
const OfficeHours = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, professors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Professor documents.
    const subscription = Meteor.subscribe(Professors.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Professor documents
    const professorItems = Professors.collection.find({}).fetch();
    return {
      professors: professorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="office-hours">
      <Row className="justify-content-center">
        <Button href="/add-urgent-sesh" variant="success" size="lg">Urgent Sesh</Button>
      </Row>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Office Hours</h2>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Button href="/add-professor" variant="success" size="lg">Add Professor</Button>
            ) : ''}
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {professors.map((professor) => (<Col key={professor._id}><ProfessorCards professor={professor} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OfficeHours;

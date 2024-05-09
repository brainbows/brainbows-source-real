import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Student';
import Student from '../components/Students';

/* Renders a table containing all of the Student documents. Use <StudentItem> to render each row. */
const ListStudents = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Students.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentItems = Students.collection.find({}).fetch();
    return {
      students: studentItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="match" className="py-3">
      <Row className="justify-content-center">
        <Button id="urgent-sesh" href="/add-urgent-sesh" variant="success" size="lg">Schedule An Urgent Sesh</Button>
      </Row>
      <Row className="justify-content-center">
        <Row className="text-center pt-3">
          <h2>List Students</h2>
        </Row>
        <Row xs={1} md={2} lg={4} className="g-4">
          {students.map((student) => (<Col key={student._id}><Student students={student} /></Col>))}
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStudents;

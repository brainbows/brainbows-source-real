import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Student';
import ClassCards from '../components/ClassCards';

/* A simple static component to render some text for the landing page. */
const ICSClasses = () => {
// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    const owner = Meteor.user().username;
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const studentItems = Students.collection.findOne({ owner: owner });
    return {
      student: studentItems,
      ready: rdy,
    };
  }, []);
  const contacts = [{
    course: 'ICS 101',
    grasshopper: 'Hailey',
    sensei: 'Braeden',
  },
  {
    course: 'ICS 211',
    grasshopper: 'Braeden',
    sensei: 'Hailey',
  },
  ];
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>ICS Classes</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact, index) => (<Col key={index}><ClassCards contact={contact} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ICSClasses;

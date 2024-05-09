import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { PersonFill, PeopleFill, CalendarFill, GearFill, ClockHistory, CheckLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Student';

/* A simple static component to render some text for the landing page. */
const UserHome = () => {
// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, student } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Student documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    const owner = Meteor.user().username;
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentItems = Students.collection.findOne({ owner: owner });
    return {
      student: studentItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="user-home" fluid className="py-3">
      <Row id="user-cards" className="align-middle text-center justify-content-center p-5">
        <Col xs={4}>
          <Card>
            <Card.Header>
              <PersonFill size={100} />
              <h4>Profile</h4>
            </Card.Header>
            <Card.Body>
              <Link id="edit-user-home" to={`/edit/${student._id}`}><Button>Edit Profile</Button></Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Header>
              <PeopleFill size={100} />
              <h4>Match</h4>
            </Card.Header>
            <Card.Body>
              <Button href="listStudent">Find other Study Buddies</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Card.Header>
              <CalendarFill size={100} />
              <h4>Calendar</h4>
            </Card.Header>
            <Card.Body>
              <Button>View Calendar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row id="user-cards" className="align-middle text-center justify-content-center p-5">
        <Col xs={4}>
          <Card>
            <Card.Header>
              <GearFill size={100} />
              <h4>Settings</h4>
            </Card.Header>
            <Card.Body>
              <Button>Change Settings</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={4}>
          <Card>
            <Card.Header>
              <ClockHistory size={100} />
              <h4>History</h4>
            </Card.Header>
            <Card.Body>
              <Button>View past sessions</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={4}>
          <Card>
            <Card.Header>
              <CheckLg size={100} />
              <h4>Goals</h4>
            </Card.Header>
            <Card.Body>
              <Button>View Goals</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserHome;

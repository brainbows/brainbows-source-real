import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { PersonFill, PeopleFill, CalendarFill, GearFill, ClockHistory, CheckLg } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const UserHome = () => (
  <Container id="user-home" fluid className="py-3">
    <Row id="user-cards" className="align-middle text-center justify-content-center p-5">
      <Col xs={4}>
        <Card>
          <Card.Header>
            <PersonFill size={100} />
            <h4>Profile</h4>
          </Card.Header>
          <Card.Body>
            <Button>Edit Profile</Button>
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
            <Button href="admin">Find other Study Buddies</Button>
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
);

export default UserHome;

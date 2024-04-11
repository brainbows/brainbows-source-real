import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PersonFill, PeopleFill, CalendarFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const UserHome = () => (
  <Container id="user-home" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <PersonFill size={50} />
        <h1>Profile</h1>
      </Col>

      <Col xs={4}>
        <PeopleFill size={50} />
        <h1>Match</h1>
      </Col>

      <Col xs={4}>
        <CalendarFill size={50} />
        <h1>Calendar</h1>
      </Col>

    </Row>
  </Container>
);

export default UserHome;

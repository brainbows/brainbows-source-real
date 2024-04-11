import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Calendar2Event, PeopleFill, Person } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="text-center justify-content-center p-5">
      <Col xs={8} className="justify-content-center fluid">
        <h1 id="landing-title">Study Better With A Warrior</h1>
        <p>Find a Study Buddy and Connect with Other UH Manoa ICS students</p>
      </Col>
    </Row>
    <Row className="text-center justify-content-center p-5">
      <Col xs={3}>
        <Person size={150} />
        <h4 className="p-2">Register</h4>
        <p>Create an account that indicates which courses you need help in, or you can help with</p>
      </Col>
      <Col xs={3}>
        <PeopleFill size={150} />
        <h4 className="p-2">Connect</h4>
        <p>Find and connect with other students who are experienced with the course and can help. Or find and connect with other students that you can offer your assistance to.</p>
      </Col>
      <Col xs={3}>
        <Calendar2Event size={150} />
        <h4 className="p-2">Schedule a Study Sesh</h4>
        <p>Pick a time to meet up for a study session and specify the topic that will be covered</p>
      </Col>
    </Row>
  </Container>
);

export default Landing;

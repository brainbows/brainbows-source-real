import React from 'react';
import { CardSubtitle, Col, Container, Row } from 'react-bootstrap';
import { Envelope, Telephone } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        <CardSubtitle>Brainbows</CardSubtitle>
        {' '}
        <br />
        Information & Computer Sciences
        {' '}
        <br />
        University of Hawaii at Manoa
        {' '}
        <br />
        Project Homepage
        {' '}
        <hr />
        <Row>
          <Col>
            <strong>Braeden Mendoza</strong>
            <br />
            <Envelope className="icon-margin" />
            <Telephone className="icon-margin" />
          </Col>
          <Col>
            <strong>Yilamu Lafeier</strong>
            <br />
            <Envelope className="icon-margin" />
            <Telephone className="icon-margin" />
          </Col>
          <Col>
            <strong>Jay Suh</strong>
            <br />
            <Envelope className="icon-margin" />
            <Telephone className="icon-margin" />
          </Col>
          <Col>
            <strong>Hailey Fagaragan</strong>
            <br />
            <Envelope className="icon-margin" />
            <Telephone className="icon-margin" />
          </Col>
          <Col>
            <strong>Kaelan Valencia</strong>
            <br />
            <Envelope className="icon-margin" />
            <Telephone className="icon-margin" />
          </Col>
        </Row>
      </Col>
    </Container>
  </footer>
);

export default Footer;

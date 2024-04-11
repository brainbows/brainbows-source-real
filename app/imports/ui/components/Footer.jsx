import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Telephone, Envelope } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Contact Us
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

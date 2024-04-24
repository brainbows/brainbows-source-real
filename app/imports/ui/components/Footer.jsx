import React from 'react';
import { CardSubtitle, Col, Container, Row } from 'react-bootstrap';

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
            <strong><a href="https://braeden-cs.github.io/">Braeden Mendoza</a></strong>
            <br />
          </Col>
          <Col>
            <strong><a href="https://yilamulafeier.github.io/">Yilamu Lafeier</a></strong>
            <br />
          </Col>
          <Col>
            <strong><a href="https://jayssuh.github.io/">Jay Suh</a></strong>
            <br />
          </Col>
          <Col>
            <strong><a href="https://haileyfagaragan.github.io/">Hailey Fagaragan</a></strong>
            <br />
          </Col>
          <Col>
            <strong><a href="https://kaelankv.github.io/">Kaelan Valencia</a></strong>
            <br />
          </Col>
        </Row>
      </Col>
    </Container>
  </footer>
);

export default Footer;

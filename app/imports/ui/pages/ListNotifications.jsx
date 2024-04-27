import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
import { UrgentNotification } from '../../api/urgent-notif/UrgentNotif';

const MakeCard = ({ urgentNotif }) => (
  <Col>
    <Card>
      <Card.Header>
        <Card.Title>URGENT</Card.Title>
        <Card.Subtitle>A student is in the ICSpace and needs your help</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          Student: {urgentNotif.from}
        </Card.Text>
        <Card.Text>
          Course: {urgentNotif.course}
        </Card.Text>
        <Card.Text>
          Topic: {urgentNotif.topic}
        </Card.Text>
        <Card.Text>
          Time: {urgentNotif.startTime} - {urgentNotif.endTime}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propType = {
  urgentNotif: PropTypes.shape({
    from: PropTypes.string,
    course: PropTypes.string,
    topic: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }).isRequired,
};

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListNotifications = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, urgentNotifs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(UrgentNotification.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const urgentNotifItems = UrgentNotification.collection.find({}).fetch();
    return {
      urgentNotifs: urgentNotifItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        {urgentNotifs.map((urgentNotif, index) => <MakeCard key={index} urgentNotif={urgentNotif} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListNotifications;

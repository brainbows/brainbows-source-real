import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfessorCards from '../components/ProfessorCards';
import { Students } from '../../api/student/Student';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const OfficeHours = () => {
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
    firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii',
    image: 'https://github.com/philipmjohnson.png', courses: 'ICS 314',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
      'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com',
    officeHours: 'TR: 1:00pm - 2:00pm',
  },
  {
    firstName: 'Henri', lastName: 'Casanova', address: 'POST 307, University of Hawaii',
    image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4', courses: 'ICS 314',
    description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
        'that I ran the Hana relay with an actual Team.',
    officeHours: 'TR: 1:00pm - 2:00pm',
  },
  {
    firstName: 'Kim', lastName: 'Binsted', address: 'POST 307, University of Hawaii',
    image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg', courses: 'ICS 314',
    description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
        'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
        'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
        '"What do you call a Martian who drinks beer? An ale-ien!".',
    officeHours: 'TR: 1:00pm - 2:00pm',
  },
  ];

  return (ready ? (
    <Container className="py-3" id="office-hours">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Professor & TA Office Hours</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact, index) => (<Col key={index}><ProfessorCards contact={contact} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OfficeHours;

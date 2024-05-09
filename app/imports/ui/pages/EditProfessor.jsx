import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Professors } from '../../api/professor/Professor';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Professors.schema);

/* Renders the EditProfessor page for editing a single document. */
const EditProfessor = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to professor documents.
    const subscription = Meteor.subscribe(Professors.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Professors.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditProfessor', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, room, roomLocation, image, coursesTaught, days, startTime, endTime } = data;
    Professors.collection.update(_id, { $set: { name, room, roomLocation, image, coursesTaught, days, startTime, endTime } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Professor</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="Name" />
                <TextField name="room" placeholder="Room Number" />
                <TextField name="roomLocation" placeholder="Institution" />
                <TextField name="image" placeholder="Image Link" />
                <SelectField name="coursesTaught" multiple checkboxes inline />
                <SelectField name="days" multiple checkboxes inline />
                <TextField name="startTime" placeholder="Office Hours Start Time" />
                <TextField name="endTime" placeholder="Office Hours End Time" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfessor;

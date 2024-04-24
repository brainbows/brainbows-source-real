import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Students } from '../../api/student/Student';

const bridge = new SimpleSchema2Bridge(Students.schema);

/* Renders the EditProfile page for editing a single document. */
const EditProfile = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditProfile', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Students.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Students.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditProfile', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, owner, level, grasshopper, sensei } = data;
    Students.collection.update(_id, { $set: { name, owner, level, grasshopper, sensei } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2 id="edit-title">Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Row id="name">
                <Col><TextField name="name" showInlineError placeholder="Your name" /></Col>
                <Col><TextField name="owner" showInlineError placeholder="Your name" disabled /></Col>
              </Row>
              <Row id="level">
                <Col><SelectField name="level" showInlineError /></Col>
              </Row>
              <SelectField
                name="grasshopper"
                showInlineError
                help="Select all classes you need help in"
                multiple
                checkboxes
                inline
              />
              <SelectField
                name="sensei"
                showInlineError
                help="Select all classes you need help in"
                multiple
                checkboxes
                inline
              />
              <SubmitField value="Submit" />
              <ErrorsField />
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Professors } from '../../api/professor/Professor';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  owner: String,
  room: String,
  roomLocation: String,
  image: String,
  coursesTaught: {
    type: String,
    allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
  },
  days: {
    type: String,
    allowedValues: ['M', 'T', 'W', 'R', 'F'],
  },
  startTime: String,
  endTime: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddProfessor page for adding a document. */
const AddProfessor = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, room, roomLocation, image, coursesTaught, days, startTime, endTime } = data;
    const owner = Meteor.user().username;
    Professors.collection.insert(
      { name, room, roomLocation, image, coursesTaught, days, startTime, endTime, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Professor</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="Name" />
                <TextField name="owner" placeholder="Email" />
                <TextField name="room" placeholder="Room Number" />
                <TextField name="roomLocation" placeholder="Institution" />
                <TextField name="image" placeholder="Image Link" />
                <SelectField name="coursesTaught" multiple checkboxes inline />
                <SelectField name="days" multiple checkboxes inline />
                <TextField name="startTime" placeholder="Office Hours Start Time" />
                <TextField name="endTime" placeholder="Office Hours End Time" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProfessor;

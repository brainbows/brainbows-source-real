import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UrgentSesh } from '../../api/urgent/Urgent';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  course: {
    type: String,
    allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
  },
  topic: String,
  startTime: {
    type: String,
    allowedValues: ['7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 apm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm'],
  },
  endTime: {
    type: String,
    allowedValues: ['7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 apm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddUrgentSesh = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, course, topic, startTime, endTime } = data;
    const owner = Meteor.user().username;
    UrgentSesh.collection.insert(
      { name, course, topic, startTime, endTime, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Urgent Sesh created successfully, Senseis are notified', 'success');
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
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <SelectField name="course" />
                <LongTextField name="topic" />
                <SelectField name="startTime" />
                <SelectField name="endTime" />
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

export default AddUrgentSesh;
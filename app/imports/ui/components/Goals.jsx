import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Goals } from '../../api/goals/Goals';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  owner: String,
  shortTermGoal: String,
  longTermGoal: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddGoal = ({ owner, shortTermGoal, longTermGoal }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    Goals.collection.insert(
      { owner, shortTermGoal, longTermGoal },
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
          <Col className="text-center"><h4>Add Goals</h4></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="goal" />
                <SubmitField />
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="shortTermGoal" value={shortTermGoal} />
                <HiddenField name="longTermGoal" value={longTermGoal} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddGoal.propTypes = {
  owner: String.isRequired,
  shortTermGoal: String.isRequired,
  longTermGoal: String.isRequired,
};

export default Goals;

// ViewGoals.jsx
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Goals } from '../../api/goals/Goals.js';

const ViewGoals = ({ goals }) => (
  <div>
    <h1>View Goals</h1>
    <ul>
      {goals.map(goal => (
        <li key={goal._id}>
          Short Term: {goal.shortTermGoal}, Long Term: {goal.longTermGoal}
        </li>
      ))}
    </ul>
  </div>
);

ViewGoals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    shortTermGoal: PropTypes.string.isRequired,
    longTermGoal: PropTypes.string.isRequired,
  })).isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('goals');
  return {
    goals: Goals.collection.find({}).fetch(),
  };
})(ViewGoals);

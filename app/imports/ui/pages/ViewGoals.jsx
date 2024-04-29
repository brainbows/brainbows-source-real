import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Goals } from '../../api/goals/Goals';

const ViewGoals = () => {
  const { goals, ready } = useTracker(() => {
    const noDataAvailable = { goals: [] };
    const handler = Meteor.subscribe('goals');
    if (!handler.ready()) {
      return noDataAvailable;
    }
    const fetchedGoals = Goals.collection.find().fetch();
    return { goals: fetchedGoals };
  });

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View Goals</h2>
      {goals.map((goal) => (
        <div key={goal._id}>
          <h3>Short Term Goal: {goal.shortTermGoal}</h3>
          <h3>Long Term Goal: {goal.longTermGoal}</h3>
        </div>
      ))}
    </div>
  );
};

export default ViewGoals;

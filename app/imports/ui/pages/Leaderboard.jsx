import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Meteor.call('users.getSortedByRating', (error, result) => {
      if (!error) {
        setUsers(result);
      }
    });
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

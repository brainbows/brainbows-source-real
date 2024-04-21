import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/student/Student';
import { UrgentSesh } from '../../api/urgent/Urgent';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addStudent = (student) => {
  console.log(`  Adding: ${student.name} (${student.owner})`);
  Students.collection.insert(student);
};

// Initialize the StuffsCollection if empty.
if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudents) {
    console.log('Creating default Students.');
    Meteor.settings.defaultStudents.forEach(student => addStudent(student));
  }
}

const addUrgent = (urgent) => {
  console.log(`  Adding: ${urgent.name} (${urgent.owner})`);
  UrgentSesh.collection.insert(urgent);
};

// Initialize the StuffsCollection if empty.
if (UrgentSesh.collection.find().count() === 0) {
  if (Meteor.settings.defaultUrgent) {
    console.log('Creating default Urgent Sessions.');
    Meteor.settings.defaultUrgent.forEach(urgent => addUrgent(urgent));
  }
}

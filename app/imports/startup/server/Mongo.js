import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/student/Student';
import { Professors } from '../../api/professor/Professor';
import { UrgentSesh } from '../../api/urgent/Urgent';
import { UrgentNotification } from '../../api/urgent-notif/UrgentNotif';
import { Events } from '../../api/events/Events';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addStudent = (student) => {
  console.log(`  Adding: ${student.name} (${student.owner})`);
  Students.collection.insert(student);
};

// Initialize the StudentsCollection if empty.
if (Students.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudents) {
    console.log('Creating default Students.');
    Meteor.settings.defaultStudents.forEach(student => addStudent(student));
  }
}

const addEvent = (event) => {
  console.log(`  Adding: ${event.title} (${event.owner})`);
  Events.collection.insert(event);
};

// Initialize the EventsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(event => addEvent(event));
  }
}

const addProfessor = (professor) => {
  console.log(`  Adding: ${professor.name} (${professor.owner})`);
  Professors.collection.insert(professor);
};

// Initialize the StudentsCollection if empty.
if (Professors.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessors) {
    console.log('Creating default Professors.');
    Meteor.settings.defaultProfessors.forEach(professor => addProfessor(professor));
  }
}

const addUrgent = (urgent) => {
  console.log(`  Adding: ${urgent.name} (${urgent.owner})`);
  UrgentSesh.collection.insert(urgent);
};

// Initialize the StudentsCollection if empty.
if (UrgentSesh.collection.find().count() === 0) {
  if (Meteor.settings.defaultUrgent) {
    console.log('Creating default Urgent Sessions.');
    Meteor.settings.defaultUrgent.forEach(urgent => addUrgent(urgent));
  }
}

const addUrgentNotif = (urgentNotif) => {
  console.log(`  Adding: ${urgentNotif.from} (${urgentNotif.owner})`);
  UrgentNotification.collection.insert(urgentNotif);
};

// Initialize the StudentsCollection if empty.
if (UrgentNotification.collection.find().count() === 0) {
  if (Meteor.settings.defaultUrgentNotification) {
    console.log('Creating default Urgent Notifications.');
    Meteor.settings.defaultUrgentNotification.forEach(urgentNotif => addUrgentNotif(urgentNotif));
  }
}

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The StudentsCollection. It encapsulates state and variable values for students.
 */
class StudentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'defaultStudents';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      owner: String,
      image: String,
      level: {
        type: String,
        allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
      },
      grasshopper: {
        type: Array,
      },
      'grasshopper.$': {
        type: String,
        allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
      },
      sensei: {
        type: Array,
      },
      'sensei.$': {
        type: String,
        allowedValues: ['ICS 101', 'ICS 110P', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241'],
      },
      description: String,
      ratings: {
        type: Array,
        blackbox: true,
        optional: true,
      },
      'ratings.$': {
        type: Object,
      },
      'ratings.$.value': {
        type: Number,
        allowedValues: [1, 2, 3, 4, 5], // Assuming ratings are integers between 1 and 5
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.generalPublicationName = `${this.name}.publication.general`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StudentsCollection}
 */
export const Students = new StudentsCollection();

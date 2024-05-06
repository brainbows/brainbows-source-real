import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfessorsCollection. It encapsulates state and variable values for professors.
 */
class ProfessorsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfessorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
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
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.generalPublicationName = `${this.name}.publication.general`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfessorsCollection.
 * @type {ProfessorsCollection}
 */
export const Professors = new ProfessorsCollection();

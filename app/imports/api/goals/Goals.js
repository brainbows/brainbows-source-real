import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class GoalsCollection {
  constructor() {
    this.name = 'GoalsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      owner: String,
      shortTermGoal: String,
      longTermGoal: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Goals = new GoalsCollection();

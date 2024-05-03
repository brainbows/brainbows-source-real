import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RatingCollection {
  constructor() {
    this.name = 'RatingCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      value: Number,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {RatingCollection}
 */
export const Rating = new RatingCollection();

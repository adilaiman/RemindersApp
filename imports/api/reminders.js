//Connect to MongoDB and create a new collection
import { Mongo } from "meteor/mongo";

export const Reminders = new Mongo.Collection("reminders");
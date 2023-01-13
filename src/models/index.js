// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Subscribe, Organization, Event, RSVP, User } = initSchema(schema);

export {
  Subscribe,
  Organization,
  Event,
  RSVP,
  User
};
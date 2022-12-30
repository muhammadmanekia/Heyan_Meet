// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Organization, Event, RSVP, User } = initSchema(schema);

export {
  Organization,
  Event,
  RSVP,
  User
};
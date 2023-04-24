import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type SubscribeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RSVPMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerSubscribe = {
  readonly id: string;
  readonly userID: string;
  readonly Organization?: Organization | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubscribe = {
  readonly id: string;
  readonly userID: string;
  readonly Organization: AsyncItem<Organization | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Subscribe = LazyLoading extends LazyLoadingDisabled ? EagerSubscribe : LazySubscribe

export declare const Subscribe: (new (init: ModelInit<Subscribe, SubscribeMetaData>) => Subscribe) & {
  copyOf(source: Subscribe, mutator: (draft: MutableModel<Subscribe, SubscribeMetaData>) => MutableModel<Subscribe, SubscribeMetaData> | void): Subscribe;
}

type EagerOrganization = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly url?: string | null;
  readonly phone?: string | null;
  readonly Events?: (Event | null)[] | null;
  readonly Subscribes?: (Subscribe | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrganization = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly url?: string | null;
  readonly phone?: string | null;
  readonly Events: AsyncCollection<Event>;
  readonly Subscribes: AsyncCollection<Subscribe>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Organization = LazyLoading extends LazyLoadingDisabled ? EagerOrganization : LazyOrganization

export declare const Organization: (new (init: ModelInit<Organization, OrganizationMetaData>) => Organization) & {
  copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

type EagerEvent = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly zipcode?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly url?: string | null;
  readonly startDateTime?: string | null;
  readonly endDateTime?: string | null;
  readonly streetAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly country?: string | null;
  readonly banner?: string | null;
  readonly createdBy?: string | null;
  readonly createdOn?: string | null;
  readonly needRsvp?: boolean | null;
  readonly isActive?: boolean | null;
  readonly paymentAmount?: number | null;
  readonly organizationID: string;
  readonly RSVPS?: (RSVP | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly zipcode?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly url?: string | null;
  readonly startDateTime?: string | null;
  readonly endDateTime?: string | null;
  readonly streetAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly country?: string | null;
  readonly banner?: string | null;
  readonly createdBy?: string | null;
  readonly createdOn?: string | null;
  readonly needRsvp?: boolean | null;
  readonly isActive?: boolean | null;
  readonly paymentAmount?: number | null;
  readonly organizationID: string;
  readonly RSVPS: AsyncCollection<RSVP>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event, EventMetaData>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}

type EagerRSVP = {
  readonly id: string;
  readonly numberOfAttendees?: number | null;
  readonly comments?: string | null;
  readonly paidAmount?: number | null;
  readonly eventID: string;
  readonly userID: string;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRSVP = {
  readonly id: string;
  readonly numberOfAttendees?: number | null;
  readonly comments?: string | null;
  readonly paidAmount?: number | null;
  readonly eventID: string;
  readonly userID: string;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RSVP = LazyLoading extends LazyLoadingDisabled ? EagerRSVP : LazyRSVP

export declare const RSVP: (new (init: ModelInit<RSVP, RSVPMetaData>) => RSVP) & {
  copyOf(source: RSVP, mutator: (draft: MutableModel<RSVP, RSVPMetaData>) => MutableModel<RSVP, RSVPMetaData> | void): RSVP;
}

type EagerUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly RSVPS?: (RSVP | null)[] | null;
  readonly Subscribes?: (Subscribe | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly RSVPS: AsyncCollection<RSVP>;
  readonly Subscribes: AsyncCollection<Subscribe>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}
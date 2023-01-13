/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubscribe = /* GraphQL */ `
  subscription OnCreateSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
  ) {
    onCreateSubscribe(filter: $filter) {
      id
      organizationID
      userID
      Organization {
        id
        name
        email
        url
        phone
        Events {
          nextToken
          startedAt
        }
        Subscribes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSubscribe = /* GraphQL */ `
  subscription OnUpdateSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
  ) {
    onUpdateSubscribe(filter: $filter) {
      id
      organizationID
      userID
      Organization {
        id
        name
        email
        url
        phone
        Events {
          nextToken
          startedAt
        }
        Subscribes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSubscribe = /* GraphQL */ `
  subscription OnDeleteSubscribe(
    $filter: ModelSubscriptionSubscribeFilterInput
  ) {
    onDeleteSubscribe(filter: $filter) {
      id
      organizationID
      userID
      Organization {
        id
        name
        email
        url
        phone
        Events {
          nextToken
          startedAt
        }
        Subscribes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onCreateOrganization(filter: $filter) {
      id
      name
      email
      url
      phone
      Events {
        items {
          id
          title
          description
          zipcode
          email
          phone
          url
          startDateTime
          endDateTime
          streetAddress
          city
          state
          country
          banner
          createdBy
          createdOn
          needRsvp
          isActive
          paymentAmount
          organizationID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onUpdateOrganization(filter: $filter) {
      id
      name
      email
      url
      phone
      Events {
        items {
          id
          title
          description
          zipcode
          email
          phone
          url
          startDateTime
          endDateTime
          streetAddress
          city
          state
          country
          banner
          createdBy
          createdOn
          needRsvp
          isActive
          paymentAmount
          organizationID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization(
    $filter: ModelSubscriptionOrganizationFilterInput
  ) {
    onDeleteOrganization(filter: $filter) {
      id
      name
      email
      url
      phone
      Events {
        items {
          id
          title
          description
          zipcode
          email
          phone
          url
          startDateTime
          endDateTime
          streetAddress
          city
          state
          country
          banner
          createdBy
          createdOn
          needRsvp
          isActive
          paymentAmount
          organizationID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      title
      description
      zipcode
      email
      phone
      url
      startDateTime
      endDateTime
      streetAddress
      city
      state
      country
      banner
      createdBy
      createdOn
      needRsvp
      isActive
      paymentAmount
      organizationID
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      title
      description
      zipcode
      email
      phone
      url
      startDateTime
      endDateTime
      streetAddress
      city
      state
      country
      banner
      createdBy
      createdOn
      needRsvp
      isActive
      paymentAmount
      organizationID
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      title
      description
      zipcode
      email
      phone
      url
      startDateTime
      endDateTime
      streetAddress
      city
      state
      country
      banner
      createdBy
      createdOn
      needRsvp
      isActive
      paymentAmount
      organizationID
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      phone
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      phone
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      phone
      RSVPS {
        items {
          id
          numberOfAttendees
          comments
          paidAmount
          eventID
          userID
          username
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Subscribes {
        items {
          id
          organizationID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateRSVP = /* GraphQL */ `
  subscription OnCreateRSVP($filter: ModelSubscriptionRSVPFilterInput) {
    onCreateRSVP(filter: $filter) {
      id
      numberOfAttendees
      comments
      paidAmount
      eventID
      userID
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateRSVP = /* GraphQL */ `
  subscription OnUpdateRSVP($filter: ModelSubscriptionRSVPFilterInput) {
    onUpdateRSVP(filter: $filter) {
      id
      numberOfAttendees
      comments
      paidAmount
      eventID
      userID
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteRSVP = /* GraphQL */ `
  subscription OnDeleteRSVP($filter: ModelSubscriptionRSVPFilterInput) {
    onDeleteRSVP(filter: $filter) {
      id
      numberOfAttendees
      comments
      paidAmount
      eventID
      userID
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubscribe = /* GraphQL */ `
  query GetSubscribe($id: ID!) {
    getSubscribe(id: $id) {
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
export const listSubscribes = /* GraphQL */ `
  query ListSubscribes(
    $filter: ModelSubscribeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscribes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        organizationID
        userID
        Organization {
          id
          name
          email
          url
          phone
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
      nextToken
      startedAt
    }
  }
`;
export const syncSubscribes = /* GraphQL */ `
  query SyncSubscribes(
    $filter: ModelSubscribeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubscribes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        organizationID
        userID
        Organization {
          id
          name
          email
          url
          phone
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
      nextToken
      startedAt
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOrganizations = /* GraphQL */ `
  query SyncOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        RSVPS {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        RSVPS {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        RSVPS {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        phone
        RSVPS {
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
      nextToken
      startedAt
    }
  }
`;
export const getRSVP = /* GraphQL */ `
  query GetRSVP($id: ID!) {
    getRSVP(id: $id) {
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
export const listRSVPS = /* GraphQL */ `
  query ListRSVPS(
    $filter: ModelRSVPFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRSVPS(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncRSVPS = /* GraphQL */ `
  query SyncRSVPS(
    $filter: ModelRSVPFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRSVPS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;

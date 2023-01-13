/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubscribe = /* GraphQL */ `
  mutation CreateSubscribe(
    $input: CreateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    createSubscribe(input: $input, condition: $condition) {
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
export const updateSubscribe = /* GraphQL */ `
  mutation UpdateSubscribe(
    $input: UpdateSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    updateSubscribe(input: $input, condition: $condition) {
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
export const deleteSubscribe = /* GraphQL */ `
  mutation DeleteSubscribe(
    $input: DeleteSubscribeInput!
    $condition: ModelSubscribeConditionInput
  ) {
    deleteSubscribe(input: $input, condition: $condition) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRSVP = /* GraphQL */ `
  mutation CreateRSVP(
    $input: CreateRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    createRSVP(input: $input, condition: $condition) {
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
export const updateRSVP = /* GraphQL */ `
  mutation UpdateRSVP(
    $input: UpdateRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    updateRSVP(input: $input, condition: $condition) {
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
export const deleteRSVP = /* GraphQL */ `
  mutation DeleteRSVP(
    $input: DeleteRSVPInput!
    $condition: ModelRSVPConditionInput
  ) {
    deleteRSVP(input: $input, condition: $condition) {
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

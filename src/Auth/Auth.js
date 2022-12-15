import {Auth, Hub} from 'aws-amplify';

import {View, Text, TextInput, Pressable, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navigation from '../Navigation/Navigation';

const initialFormState = {
  name: '',
  username: '',
  password: '',
  email: '',
  phone_number: '',
  authCode: '',
  userType: 'user',
  formType: 'signin',
};

const AuthComponent = () => {
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);

  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  async function signUp() {
    try {
      const {username, password, email, phone_number, userType} = formState;
      const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          'custom:user_type': userType, // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
      updateFormState(() => ({...formState, formType: 'confirmSignup'}));
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function confirmSignUp() {
    try {
      const {username, authCode} = formState;
      await Auth.confirmSignUp(username, authCode);
      updateFormState(() => ({...formState, formType: 'signedIn'}));
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function signin() {
    try {
      const {username, password} = formState;
      await Auth.signIn(username, password);
      updateFormState(() => ({...formState, formType: 'signedIn'}));
    } catch (error) {
      console.log('error confirming sign in', error);
      console.log(formState);
    }
  }

  async function setAuthListener() {
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signOut':
          updateFormState(() => ({...formState, formType: 'signIn'}));
      }
    });
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user', user);
      updateUser(user);
      updateFormState(() => ({...formState, formType: 'signedIn'}));
    } catch (error) {
      console.log('error:', error);
    }
  }
  function onChange(e, name) {
    updateFormState(() => ({...formState, [name]: e}));
  }

  function onToggle() {
    updateFormState(() => ({...formState, userType: 'organization'}));
  }

  const {formType} = formState;

  return (
    <View>
      {formType === 'signin' && (
        <View>
          <TextInput
            name="username"
            onChangeText={e => onChange(e, 'username')}
            placeholder="username"
            autoCapitalize="none"
          />
          <TextInput
            name="password"
            onChangeText={e => onChange(e, 'password')}
            placeholder="password"
            autoCapitalize="none"
          />
          <Pressable onPress={signin}>
            <Text>SIGN IN</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              updateFormState(() => ({...formState, formType: 'signup'}))
            }>
            <Text>SIGN UP</Text>
          </Pressable>
        </View>
      )}
      {formType === 'signup' && (
        <View>
          <TextInput
            name="name"
            onChangeText={e => onChange(e, 'name')}
            placeholder="Name"
          />
          <TextInput
            name="username"
            onChangeText={e => onChange(e, 'username')}
            placeholder="username"
            autoCapitalize="none"
          />
          <TextInput
            name="email"
            onChangeText={e => onChange(e, 'email')}
            placeholder="email"
            autoCapitalize="none"
          />
          <TextInput
            name="phone_number"
            onChangseText={e => onChange(e, 'phone_number')}
            placeholder="Phone Number"
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <TextInput
            name="password"
            onChangeText={e => onChange(e, 'password')}
            placeholder="password"
            autoCapitalize="none"
          />
          <Switch onValueChange={onToggle} />
          <Pressable onPress={signUp}>
            <Text>SIGN UP</Text>
          </Pressable>
        </View>
      )}
      {formType === 'confirmSignup' && (
        <View>
          <TextInput
            name="authCode"
            onChangeText={onChange}
            placeholder="Confirmation Code"
            autoCapitalize="none"
          />
          <Pressable onPress={confirmSignUp}>
            <Text>CONFIRM SIGN UP</Text>
          </Pressable>
        </View>
      )}
      {formType === 'signedIn' && <Navigation />}
    </View>
  );
};

export default AuthComponent;

// function listenToAutoSignInEvent() {
//   Hub.listen('auth', ({payload}) => {
//     const {event} = payload;
//     if (event === 'autoSignIn') {
//       const user = payload.data;
//       // assign user
//     } else if (event === 'autoSignIn_failure') {
//       // redirect to sign in page
//     }
//   });
// }

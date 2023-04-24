import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import Auth from './src/Auth/Auth';

import Navigation from './src/Navigation/Navigation';
import SignInScreen from './src/Screens/AuthScreens/SignInScreen/SignInScreen';

Amplify.configure(awsconfig);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'Roboto'};

function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Navigation />
        {/* <Auth /> */}
        {/* <SignInScreen /> */}
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    // paddingVertical: 50,
  },
});

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full Name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Username',
      key: 'username',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'User Type',
      key: 'gender',
      required: true,
      displayOrder: 4,
      gender: true,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 5,
      type: 'password',
    },
  ],
};

export default App;

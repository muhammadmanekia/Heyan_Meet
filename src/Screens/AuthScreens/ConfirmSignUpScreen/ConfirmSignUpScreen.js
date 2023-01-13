import {API, Auth, graphqlOperation} from 'aws-amplify';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import {createOrganization, createUser} from '../../../graphql/mutations';

function ConfirmSignUpScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const onConfirmSignUp = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(data.username, data.code);
      await Auth.signIn({
        username: data.username,
        password: route.params.password,
      });

      const thisUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (thisUser.attributes.profile === 'organization') {
        await API.graphql(
          graphqlOperation(createOrganization, {
            input: {
              id: thisUser.attributes.sub,
              name: thisUser.attributes.name,
              email: thisUser.attributes.email,
            },
          }),
        );
      }
      if (thisUser.attributes.profile === 'user') {
        await API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: thisUser.attributes.sub,
              name: thisUser.attributes.name,
              email: thisUser.attributes.email,
            },
          }),
        );
      }
      if (thisUser.attributes.profile === 'user') {
        await API.graphql(
          graphqlOperation(createUser, {
            input: {
              id: thisUser.attributes.sub,
              name: thisUser.attributes.name,
              email: thisUser.attributes.email,
            },
          }),
        );
      }
      console.log('Response', response);
    } catch (e) {
      console.log('Error Signing In: ', e.message);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        code: '',
      }}
      onSubmit={values => onConfirmSignUp(values)}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerTitle}>
            <Image
              source={require('../../../../assets/images/SignInLogo.png')}
              style={styles.logoFull}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              autoCapitalize="none"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Code"
              autoCapitalize="none"
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
            />
            <View style={{alignItems: 'center', margin: 20}}>
              <Pressable onPress={handleSubmit} style={styles.signIn}>
                <Text style={styles.primary}>VERIFY EMAIL</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.signUp}>
                <Text style={styles.secondary}>GO BACK TO SIGN IN</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DB589',
  },
  primary: {fontSize: 18, color: 'white'},
  secondary: {fontSize: 14, color: 'white', fontWeight: 'bold'},
  headerTitle: {
    alignItems: 'center',
    marginTop: 150,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 25,
  },
  signIn: {
    backgroundColor: 'black',
    alignItems: 'center',
    width: 295,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    shadowRadius: 8,
    shadowOpacity: 0.5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  logoFull: {
    width: 250,
    height: 120,
    marginRight: 20,
  },
  signUp: {
    margin: 20,
    alignItems: 'center',
    width: 295,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default ConfirmSignUpScreen;

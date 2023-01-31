import {Auth} from 'aws-amplify';
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
import {useNavigation} from '@react-navigation/core';

const SignInScreen = () => {
  const navigation = useNavigation();

  const onSignUpPressed = async data => {
    const {username, password, email, phone_number, name, profile} = data;
    try {
      const response = await Auth.signUp({
        username,
        password,
        attributes: {email, name, phone_number: '+1' + phone_number, profile},
      });
      navigation.navigate('ConfirmSignUp', {password: password});
    } catch (e) {
      console.log('Error Signing Up: ', e.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone_number: '',
        username: '',
        password: '',
        profile: 'user',
      }}
      onSubmit={values => onSignUpPressed(values)}>
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
              placeholder="Enter Full Name"
              autoCapitalize="none"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              autoCapitalize="none"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
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
              placeholder="Enter Phone Number"
              autoCapitalize="none"
              onChangeText={handleChange('phone_number')}
              onBlur={handleBlur('email')}
              value={values.phone_number}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              //   placeholderTextColor="rgba(255,255,255, 0.2)"
            />
            <Text style={styles.radioTitle}>Signing Up As</Text>
            <View style={styles.radio}>
              <Pressable
                value="user"
                onPress={() => {
                  setFieldValue('profile', 'user');
                }}>
                <View
                  style={
                    values.profile === 'user'
                      ? styles.periodActive
                      : styles.period
                  }>
                  <Text
                    style={[
                      {fontWeight: 'bold', textAlign: 'center'},
                      values.profile != 'user' && {
                        color: 'white',
                        fontWeight: 'bold',
                      },
                    ]}>
                    User
                  </Text>
                </View>
              </Pressable>
              <Pressable
                value="organization"
                onPress={() => {
                  setFieldValue('profile', 'organization');
                }}>
                <View
                  style={
                    values.profile === 'organization'
                      ? styles.periodActive
                      : styles.period
                  }>
                  <Text
                    style={[
                      {fontWeight: 'bold', textAlign: 'center'},
                      values.profile != 'organization' && {
                        color: 'white',
                        fontWeight: 'bold',
                      },
                    ]}>
                    Organization
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={{alignItems: 'center', margin: 20}}>
            <Pressable onPress={handleSubmit} style={styles.signIn}>
              <Text style={styles.primary}>SIGN UP</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.signUp}>
              <Text style={styles.secondary}>GO BACK TO SIGN IN</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DB589',
  },
  primary: {fontSize: 18, color: 'white', fontWeight: 'bold'},
  secondary: {fontSize: 14, color: 'white', fontWeight: 'bold'},
  text: {
    margin: 10,
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: 'HelveticaNeue-Medium',
    letterSpacing: 2,
  },
  headerTitle: {
    alignItems: 'center',
    marginTop: 150,
  },
  headerText: {
    fontSize: 45,
    fontFamily: 'PoiretOne-Regular',
    color: 'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
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
  period: {
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 2,
    width: 100,
  },
  periodActive: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 2,
    shadowRadius: 8,
    shadowOpacity: 0.8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    width: 100,
  },
  radioTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 9,
    fontWeight: 'bold',
  },
  radio: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default SignInScreen;

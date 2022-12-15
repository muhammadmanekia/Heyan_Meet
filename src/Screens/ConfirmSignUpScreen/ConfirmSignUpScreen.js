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

function ConfirmSignUpScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onConfirmSignUp = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(data.username, data.code);
      console.log('Response', response);
      navigation.navigate('Organizations');
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
              source={require('../../../assets/images/SignInLogo.png')}
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
                <Text style={styles.primary}>SIGN UP</Text>
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
    backgroundColor: '#3BC14A',
  },
  primary: {fontSize: 18, color: 'black'},
  secondary: {fontSize: 14, color: 'white', fontWeight: 'bold'},
  headerTitle: {
    alignItems: 'center',
    marginTop: 150,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderBottomColor: 'white',
    borderColor: 'transparent',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 25,
  },
  signIn: {
    backgroundColor: 'white',
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

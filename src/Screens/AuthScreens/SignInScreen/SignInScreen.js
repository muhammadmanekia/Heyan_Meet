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
  const [loading, setLoading] = useState(false);

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await Auth.signIn(data.username, data.password);
      // if (response.attributes.profile !== 'user') {
      //   navigation.navigate('AdminHome', {orgTitle: response.attributes.name});
      // }
    } catch (e) {
      console.log('Error Signing In: ', e.message);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      onSubmit={values => onSignInPressed(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
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

              //   placeholderTextColor="rgba(255,255,255, 0.2)"
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
          </View>
          <View style={{alignItems: 'center', margin: 20}}>
            <Pressable
              //   disabled={email !== '' && password !== '' ? false : true}
              onPress={handleSubmit}
              style={styles.signIn}>
              <Text style={styles.primary}>
                {loading ? 'PLEASE WAIT...' : 'Continue'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUp}>
              <Text style={styles.secondary}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.secondary}>Forgot Password</Text>
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
  text: {
    margin: 10,
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: 'Roboto',
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
  primary: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  secondary: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    marginHorizontal: 25,
  },
  signIn: {
    backgroundColor: 'black',
    alignItems: 'center',
    width: 295,
    height: 45,
    justifyContent: 'center',
    borderRadius: 50,
    // shadowRadius: 2,
    // shadowOpacity: 0.5,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
  },
  logoFull: {
    width: 250,
    height: 120,
    marginRight: 20,
  },
  signUp: {
    margin: 20,
    alignItems: 'center',
    width: 250,
    height: 40,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default SignInScreen;

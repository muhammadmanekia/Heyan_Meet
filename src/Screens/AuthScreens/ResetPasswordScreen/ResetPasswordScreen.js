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

const ResetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [sentCode, setSentCode] = useState(false);

  const navigation = useNavigation();

  const onResetPassword = async data => {
    const {username, code, password} = data;
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        code,
        password,
      );
      navigation.navigate('SignIn');
    } catch (e) {
      console.log('Error Resetting Code: ', e.message);
    }
  };

  const onSendCode = async data => {
    const {username} = data;
    try {
      await Auth.forgotPassword(username);
      setSentCode(true);
    } catch (e) {
      console.log('Error Sending Code: ', e.message);
    }
  };

  return (
    <Formik
      initialValues={{username: '', code: '', password: ''}}
      onSubmit={values => {
        sentCode ? onResetPassword(values) : onSendCode(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerTitle}>
            <Image
              source={require('../../../../assets/images/SignInLogo.png')}
              style={styles.logoFull}
            />
          </View>
          {sentCode ? (
            <View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Code"
                  autoCapitalize="none"
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  value={values.code}

                  //   placeholderTextColor="rgba(255,255,255, 0.2)"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter New Password"
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
                    {loading ? 'PLEASE WAIT...' : 'SIGN IN'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.signUp}>
                  <Text style={styles.secondary}>GO BACK TO SIGN IN</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View>
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
              </View>
              <View style={{alignItems: 'center', margin: 20}}>
                <Pressable
                  //   disabled={email !== '' && password !== '' ? false : true}
                  onPress={handleSubmit}
                  style={styles.signIn}>
                  <Text style={styles.primary}>
                    {loading ? 'PLEASE WAIT...' : 'SEND CODE'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.signUp}>
                  <Text style={styles.secondary}>GO BACK TO SIGN IN</Text>
                </Pressable>
              </View>
            </View>
          )}
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
  primary: {fontSize: 18, color: 'white'},
  secondary: {fontSize: 14, color: 'white', fontWeight: 'bold'},
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
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    // shadowRadius: 8,
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
    width: 295,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
});
export default ResetPasswordScreen;

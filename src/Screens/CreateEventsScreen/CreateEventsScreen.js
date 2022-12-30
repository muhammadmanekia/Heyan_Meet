import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {Formik, useFormik, useFormikContext} from 'formik';
import EventDetails from '../../Components/FormPage/EventDetails';
import RSVPDetails from '../../Components/FormPage/RSVPDetails';
import {useNavigation} from '@react-navigation/core';
import {API, graphqlOperation} from 'aws-amplify';
import {createEvent} from '../../graphql/mutations';
import {useRoute} from '@react-navigation/core';

const CreateEventsScreen = () => {
  const [date, setDate] = useState(new Date());
  const [screenCount, setScreenCount] = useState(1);
  const [data, setData] = useState({
    title: '',
    startDateTime: '',
    streetAddress: '',
    description: '',
    url: '',
    paymentAmount: '',
  });

  const navigation = useNavigation();
  const route = useRoute();
  const {user} = route.params;

  const formikProps = useFormik({
    initialValues: {
      title: '',
      startDateTime: '',
      streetAddress: '',
      description: '',
      url: '',
      paymentAmount: '',
      // zipcode: '12345',
      // email: 'test@test.com',
      // phone: '7324295791',
      // endDateTime: '1997-07-16T19:20:30.45+01:00',
      // city: 'I',
      // state: 'I',
      // country: 'I',
      // banner: 'https://www.google.com',
      // createdOn: '2020-03-12',
      // createdBy: 'Test',
      // needRsvp: true,
      // isActive: true,
      organizationID: user.sub,
      // RSVPS: [],
    },
    onSubmit: async values => {
      setData(values);
      values.paymentAmount = values.paymentAmount ? +values.paymentAmount : 0;
      console.log(data);
      try {
        await API.graphql(graphqlOperation(createEvent, {input: values}));
      } catch (e) {
        console.error(e);
      }
      navigation.navigate('AdminHome');
    },
  });

  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    const uri = await ImagePicker.launchImageLibrary(options);
    formikProps.setFieldValue('url', uri.assets[0].uri);
  }, []);

  console.log('DATA', data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create An Event</Text>
      {screenCount == 1 ? (
        <EventDetails
          formikProps={formikProps}
          onImageLibraryPress={onImageLibraryPress}
          date={date}
          screenCount={screenCount}
          setScreenCount={setScreenCount}
        />
      ) : (
        <RSVPDetails formikProps={formikProps} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    margin: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 4,
    margin: 10,
    padding: 2,
    backgroundColor: '#E4E2E2',
  },
  descriptionInput: {
    borderWidth: StyleSheet.hairlineWidth,
    width: '80%',
    alignSelf: 'center',
    height: 100,
    borderRadius: 4,
    margin: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  formTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  calendarButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3bc14a',
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 8,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  submit: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#4d5057',
    width: '50%',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 8,
  },
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
export default CreateEventsScreen;

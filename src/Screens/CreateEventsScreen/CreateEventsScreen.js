import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import {Formik, useFormik, useFormikContext} from 'formik';

const CreateEventsScreen = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    title: '',
    dateTime: '',
    location: '',
    description: '',
    uri: '',
  });

  const formikProps = useFormik({
    initialValues: {
      title: '',
      dateTime: '',
      location: '',
      description: '',
      uri: '',
    },
    onSubmit: values => {
      setData(values);
    },
  });

  const onImageLibraryPress = useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    const uri = await ImagePicker.launchImageLibrary(options);
    formikProps.setFieldValue('uri', uri.assets[0].uri);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create An Event</Text>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Event Title</Text>
        <TextInput
          style={styles.input}
          fontSize={12}
          value={formikProps.values.title}
          onChangeText={formikProps.handleChange('title')}
        />
        <Text style={styles.formTitle}>Event Date & Time</Text>
        <Pressable style={styles.calendarButton} onPress={() => setOpen(true)}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/833/833593.png',
            }}
          />
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            formikProps.setFieldValue('dateTime', date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Text style={styles.formTitle}>Event Location</Text>
        <TextInput
          multiline
          style={styles.input}
          fontSize={12}
          placeholder="Please add a location that can be searched in maps"
          onChangeText={formikProps.handleChange('location')}
          value={formikProps.values.location}
        />
        <Text style={styles.formTitle}>Description</Text>
        <TextInput
          style={styles.descriptionInput}
          fontSize={12}
          numberOfLines={4}
          multiline
          value={formikProps.values.description}
          onChangeText={formikProps.handleChange('description')}
        />
        <Text style={styles.formTitle}>Add Images</Text>
        <Pressable onPress={onImageLibraryPress} style={styles.button}>
          <Text style={styles.buttonText}>Select Image From File</Text>
        </Pressable>
      </View>
      <Pressable onPress={formikProps.handleSubmit} style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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

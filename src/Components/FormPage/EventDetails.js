import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const EventDetails = ({
  formikProps,
  onImageLibraryPress,
  date,
  setScreenCount,
  screenCount,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [paymentInput, setPaymentInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        fontSize={12}
        value={formikProps.values.title}
        onChangeText={formikProps.handleChange('title')}
        placeholder="Event Title"
        placeholderTextColor="rgba(0,0,0, 0.4)"
      />
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center'}}>
        <Pressable style={styles.calendarButton} onPress={() => setOpen(true)}>
          <Image
            style={styles.calendarIcon}
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
            formikProps.setFieldValue('startDateTime', date.toISOString());
            setSelectedDate(
              date.toDateString() + ', ' + date.toLocaleTimeString(),
            );
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.dateView}>
          <Text>{selectedDate}</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        fontSize={12}
        placeholder="Location"
        onChangeText={formikProps.handleChange('streetAddress')}
        value={formikProps.values.location}
        placeholderTextColor="rgba(0,0,0, 0.4)"
      />
      <TextInput
        style={styles.descriptionInput}
        fontSize={12}
        numberOfLines={4}
        multiline
        value={formikProps.values.description}
        onChangeText={formikProps.handleChange('description')}
        placeholder="Description"
        placeholderTextColor="rgba(0,0,0, 0.4)"
      />
      <Pressable onPress={onImageLibraryPress} style={styles.button}>
        <Image
          source={{
            uri: 'https://www.iconsdb.com/icons/preview/white/image-xxl.png',
          }}
          style={styles.icon}
        />
      </Pressable>
      <View style={{alignItems: 'center'}}>
        {paymentInput ? (
          <TextInput
            style={styles.input}
            onChangeText={formikProps.handleChange('paymentAmount')}
            value={formikProps.values.paymentAmount + ''}
            placeholder="$"
            keyboardType="numeric"
            placeholderTextColor="rgba(0,0,0, 0.4)"
          />
        ) : (
          <Pressable onPress={() => setPaymentInput(!paymentInput)}>
            <Text>Add Payment Method</Text>
          </Pressable>
        )}
      </View>
      <Pressable
        // onPress={() => setScreenCount(screenCount + 1)}
        onPress={formikProps.handleSubmit}
        style={styles.nextButton}>
        <Text style={styles.buttonText}>Submit</Text>
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
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 36,
    width: 284,
    textAlignVertical: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },
  dateView: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: 36,
    width: 230,
    textAlignVertical: 'center',
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 15,
  },
  descriptionInput: {
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 71,
    width: 284,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
  calendarIcon: {
    width: 25,
    height: 25,
    marginTop: 20,
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
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 8,
    margin: 10,
  },
  nextButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 8,
    width: 200,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
export default EventDetails;

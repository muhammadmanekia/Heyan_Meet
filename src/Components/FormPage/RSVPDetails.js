import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import React, {useState} from 'react';

const RSVPDetails = ({formikProps}) => {
  const [inputCounter, setInputCounter] = useState(1);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RSVP Form</Text>
      <Text>Add inputs for any information you need</Text>
      {[...Array(inputCounter)].map((x, i) => (
        <View style={{flexDirection: 'row', alignItems: 'center'}} key={i}>
          <TextInput
            style={styles.input}
            fontSize={12}
            // value={formikProps.values.description}
            // onChangeText={formikProps.handleChange('description')}
            placeholder="Label Input"
          />
          <Pressable
            key={x}
            style={{
              padding: 1,
              margin: 10,
              borderRadius: 10,
            }}
            onPress={() => setInputCounter(inputCounter - 1)}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/561/561179.png',
              }}
              style={styles.icon}
            />
          </Pressable>
        </View>
      ))}
      <Pressable
        style={{
          padding: 1,
          backgroundColor: '#c4c4c4',
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => setInputCounter(inputCounter + 1)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2997/2997933.png',
          }}
          style={styles.icon}
        />
      </Pressable>
      <Pressable onPress={formikProps.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  button: {
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
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 36,
    width: 220,
    textAlignVertical: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    margin: 10,
  },
});
export default RSVPDetails;

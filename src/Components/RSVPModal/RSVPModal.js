import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';

const RSVPModal = ({handleOnPress, info}) => {
  const [counter, setCounter] = useState(1);

  function updateCounter(count) {
    if (counter + count !== 0) {
      setCounter(counter + count);
    }
  }

  function handleSubmit() {
    handleOnPress('close');
  }
  return (
    <View style={styles.modalContainer}>
      {info && (
        <Pressable style={styles.modal} onPress={() => handleOnPress('close')}>
          <Text style={styles.title}>RSVP To {info.details.title}</Text>
          <View style={styles.attendance}>
            <Text>How Many Attending?</Text>
            <Pressable
              style={{...styles.increment, backgroundColor: 'green'}}
              onPress={() => updateCounter(1)}>
              <Text style={styles.sign}>+</Text>
            </Pressable>
            <View>
              <Text>{counter}</Text>
            </View>
            <Pressable
              style={{...styles.increment, backgroundColor: 'red'}}
              onPress={() => updateCounter(-1)}>
              <Text style={styles.sign}>-</Text>
            </Pressable>
          </View>
          <View style={styles.comments}>
            <Text>Comments</Text>
            <TextInput
              multiline
              style={styles.input}
              placeholder="Share information with the organizers"
              fontSize={10}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    margin: '5%',
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
    marginHorizontal: '5%',
  },
  increment: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comments: {
    margin: '5%',
  },
  input: {
    height: 80,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#4D5057',
    justifyContent: 'flex-end',
    width: 60,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
    marginBottom: '3%',
    borderRadius: 6,
  },
  submit: {
    color: 'white',
    textAlign: 'center',
    margin: 7,
  },
  sign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default RSVPModal;

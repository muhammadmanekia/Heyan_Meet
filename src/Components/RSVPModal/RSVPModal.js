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
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createRSVP} from '../../graphql/mutations';

const RSVPModal = ({handleOnPress, info}) => {
  console.log(info);
  const [counter, setCounter] = useState(1);
  const [comments, setComments] = useState(1);

  function updateCounter(count) {
    if (counter + count !== 0) {
      setCounter(counter + count);
    }
  }

  async function handleSubmit() {
    const user = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(createRSVP, {
        input: {
          userID: user.attributes.sub,
          numberOfAttendees: counter,
          comments: comments,
          eventID: info.id,
          username: user.attributes.name,
        },
      }),
    );
    console.log('RESPONSE', response);
    handleOnPress('close');
  }
  return (
    <Pressable
      style={styles.modalContainer}
      onPress={() => handleOnPress('close')}>
      {info && (
        <Pressable style={styles.modal}>
          <Text style={styles.title}>RSVP To {info.title}</Text>
          <View style={styles.attendance}>
            <Text>How Many Attending?</Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Pressable
                style={{...styles.increment}}
                onPress={() => updateCounter(1)}>
                <Text style={styles.sign}>+</Text>
              </Pressable>
              <View>
                <Text style={{margin: 20}}>{counter}</Text>
              </View>
              <Pressable
                style={{...styles.increment}}
                onPress={() => updateCounter(-1)}>
                <Text style={styles.sign}>-</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.comments}>
            <Text style={{fontWeight: 'bold'}}>Comments</Text>
            <TextInput
              multiline
              style={styles.input}
              placeholder="Share information with the organizers"
              fontSize={14}
              onBlur={e => setComments(e)}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </Pressable>
      )}
    </Pressable>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    margin: '5%',
    fontWeight: 'bold',
  },
  attendance: {alignItems: 'center'},
  increment: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 20,
  },
  comments: {
    margin: '5%',
  },
  input: {
    height: 80,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    width: 270,
  },
  button: {
    backgroundColor: '#3DB589',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginBottom: '3%',
    width: '60%',
    borderRadius: 6,
  },
  submit: {
    color: 'black',
    textAlign: 'center',
    margin: 7,
    fontWeight: 'bold',
  },
  sign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 21,
  },
});
export default RSVPModal;

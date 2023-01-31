import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {API, graphqlOperation} from 'aws-amplify';
import {deleteEvent} from '../../graphql/mutations';
import {useRoute} from '@react-navigation/core';
import {useEffect} from 'react';
import {customRSVP} from '../../graphql/customqueries';
import {useState} from 'react';
import {listRSVPS} from '../../graphql/queries';

const AdminEventInfo = () => {
  const route = useRoute();

  const [rsvps, setRsvps] = useState([]);
  const [comments, setComments] = useState('');

  const {thisEvent} = route.params;
  const navigation = useNavigation();
  var rsvpArrdemo = [];

  useEffect(() => {
    async function getRSVPs() {
      const response = await API.graphql(
        graphqlOperation(listRSVPS, {
          filter: {eventID: {eq: thisEvent.id}},
        }),
      );
      response?.data?.listRSVPS?.items.map(item => {
        if (item._deleted != true) {
          rsvpArrdemo.push({
            username: item.username,
            attendees: item.numberOfAttendees,
            comments: item.comments,
          });
        }
      });
      setRsvps([...rsvpArrdemo]);
    }
    if (thisEvent) {
      getRSVPs();
    }
  }, []);

  async function deleteEventHandler() {
    try {
      const response = await API.graphql(
        graphqlOperation(deleteEvent, {
          input: {_version: thisEvent._version, id: thisEvent.id},
        }),
      );
      navigation.navigate('AdminHome');
    } catch (e) {
      console.log('Error Deleting Event: ', e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{thisEvent.title}</Text>
      <View style={styles.previewContainer}>
        <Pressable
          onPress={() =>
            navigation.navigate('EventDetails', {thisEvent: thisEvent})
          }
          style={styles.previewButtonContainer}>
          <Text style={styles.previewButton}>Preview Event Ad</Text>
        </Pressable>
        <Pressable
          onPress={deleteEventHandler}
          style={styles.deleteButtonContainer}>
          <Text style={styles.deleteButton}>Delete Event</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.subContainer}>
          <Text style={styles.subtitle}>RSVPs</Text>
          <Text style={styles.subtitle}>{rsvps.length}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={rsvps}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.listItem}>
                {index + 1}. {item.username}
              </Text>
              <Text style={styles.listItem}>
                +{item.attendees > 1 && item.attendees - 1}
              </Text>
              {item.comments !== '' && (
                <Pressable
                  onPress={() => setComments(item.comments)}
                  style={{marginVertical: 2}}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/134/134723.png',
                    }}
                    style={{width: 20, height: 20}}
                  />
                </Pressable>
              )}
            </View>
          )}
        />
      </View>
      <Modal transparent visible={comments !== ''}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setComments('')}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Comments</Text>
            <Text style={styles.modalDescription}>{comments}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    minHeight: '20%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  modalDescription: {
    fontSize: 18,
    alignSelf: 'flex-start',
    margin: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 8,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  previewButtonContainer: {
    backgroundColor: 'rgb(225, 225, 225)',
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    margin: 20,
  },
  previewButton: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '500',
  },
  deleteButton: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500',
  },
  deleteButtonContainer: {
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 20,
  },
  list: {
    height: '80%',
  },
  listItem: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 30,
  },
});

export default AdminEventInfo;

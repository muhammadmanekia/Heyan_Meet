import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
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
  const {thisEvent} = route.params;
  const navigation = useNavigation();
  var rsvpArrdemo = [];
  console.log(thisEvent.id);

  useEffect(() => {
    async function getRSVPs() {
      const response = await API.graphql(
        graphqlOperation(listRSVPS, {
          filter: {eventID: {eq: thisEvent.id}},
        }),
      );
      console.log(response.data?.listRSVPS.items);
      response?.data?.listRSVPS?.items.map(item => {
        if (item._deleted != true) {
          rsvpArrdemo.push(item.username);
        }
      });
      setRsvps(rsvpArrdemo);
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
      console.log('RESPONSE', response);
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
          <Text style={styles.previewButton}>Delete Event</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.subContainer}>
          <Text style={styles.subtitle}>RSVPs</Text>
          <Text style={styles.subtitle}>{rsvpArrdemo.length}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={rsvps}
          renderItem={({item, index}) => (
            <Text style={styles.listItem}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
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
    backgroundColor: '#4D5057',
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    margin: 20,
  },
  previewButton: {
    alignSelf: 'center',
    color: 'white',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
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
    fontWeight: '300',
    lineHeight: 18,
  },
});

export default AdminEventInfo;

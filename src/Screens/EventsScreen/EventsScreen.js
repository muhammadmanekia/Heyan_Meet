import {View, Text, FlatList, Modal, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import EventsListItem from '../../Components/EventsListItem/EventsListItem';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useNavigation, useRoute} from '@react-navigation/core';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getEvent, listEvents} from '../../graphql/queries';

const EventsScreen = ({showRSVP}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  let currentOrg = route.params.orgTitle;
  const [rsvpInfo, setRSVPInfo] = useState([]);

  function handleOnPress(info) {
    requestAnimationFrame(() => {
      if (info !== 'close') {
        setRSVPInfo(info);
      }
      setModalVisible(!modalVisible);
    });
  }

  useEffect(() => {
    async function getEvents() {
      const user = await Auth.currentAuthenticatedUser({bypassCache: true});
      const events = await API.graphql(graphqlOperation(listEvents));

      var eventsArr = [];
      events.data.listEvents.items.map(e => {
        if (!e._deleted) {
          if (user.attributes.sub == e.organizationID) {
            eventsArr.push(e);
          }
        }
      });
      setFilteredEvents(eventsArr);
    }
    getEvents();
  }, []);

  return (
    <View style={styles.container}>
      {showRSVP && <Text style={styles.title}>Events</Text>}
      <FlatList
        data={filteredEvents}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              route.params.showRSVP
                ? navigation.navigate('EventDetails', {thisevent: item})
                : navigation.navigate('AdminInfo', {thisEvent: item});
            }}>
            <EventsListItem
              event={item}
              showRSVP={route.params.showRSVP}
              handleOnPress={handleOnPress}
            />
          </Pressable>
        )}
      />
      {route.params.showRSVP && (
        <Modal transparent visible={modalVisible}>
          <RSVPModal handleOnPress={handleOnPress} info={rsvpInfo} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 10,
    fontFamily: 'Damascus',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default EventsScreen;

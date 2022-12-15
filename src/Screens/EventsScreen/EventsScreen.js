import {View, Text, FlatList, Modal, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import events from '../../../assets/data/events.json';
import EventsListItem from '../../Components/EventsListItem/EventsListItem';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useNavigation, useRoute} from '@react-navigation/core';

const EventsScreen = ({showRSVP}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  let currentOrg = route.params.orgTitle;
  let filteredEvents = [];
  const [rsvpInfo, setRSVPInfo] = useState([]);

  function mapEvents() {
    events.map(event => {
      if (event.organization == currentOrg) {
        filteredEvents.push(event);
      }
    });
  }

  function handleOnPress(info) {
    requestAnimationFrame(() => {
      if (info !== 'close') {
        setRSVPInfo(info);
      }
      setModalVisible(!modalVisible);
    });
  }

  mapEvents();

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
                : navigation.navigate('AdminInfo');
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

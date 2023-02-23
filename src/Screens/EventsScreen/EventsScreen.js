import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EventsListItem from '../../Components/EventsListItem/EventsListItem';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useNavigation, useRoute} from '@react-navigation/core';
import {API, Auth, graphqlOperation, Storage} from 'aws-amplify';
import {listEvents} from '../../graphql/queries';
import {useIsFocused} from '@react-navigation/native';

const EventsScreen = ({showRSVP}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventBanners, setEventBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {orgId} = route.params;

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
    let checkAPISubscribed = true;

    async function getEvents() {
      setLoading(true);
      const user = await Auth.currentAuthenticatedUser({bypassCache: true});
      const events = await API.graphql(graphqlOperation(listEvents));
      if (checkAPISubscribed) {
        var eventsArr = [];
        var eventBanner = [];
        events.data.listEvents.items.map(async e => {
          if (!e._deleted) {
            if (orgId) {
              if (orgId == e.organizationID) {
                eventsArr.push(e);
              }
            } else {
              if (user.attributes.sub == e.organizationID) {
                eventsArr.push(e);
              }
            }
          }
        });
        setFilteredEvents(eventsArr);
        setLoading(false);
      }
    }
    getEvents();

    return () => {
      checkAPISubscribed = false;
      setLoading(false);
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={loading} size="large" />
      ) : (
        <View>
          <FlatList
            data={filteredEvents}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  route.params.showRSVP
                    ? navigation.navigate('EventDetails', {thisEvent: item})
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
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

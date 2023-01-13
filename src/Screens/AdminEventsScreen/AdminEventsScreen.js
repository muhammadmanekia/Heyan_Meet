import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import EventsScreen from '../EventsScreen/EventsScreen';
import {useNavigation} from '@react-navigation/core';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createOrganization} from '../../graphql/mutations';

const AdminEventsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await Auth.currentAuthenticatedUser({bypassCache: true}).then(user => {
      setUser(user.attributes);
    });
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.orgTitle}>{user && user.name} </Text> */}

      <Text style={styles.subtitle}>Upcoming Events</Text>
      <View style={styles.list}>
        <EventsScreen showRSVP={false} />
      </View>
      <Pressable
        onPress={() => navigation.navigate('CreateEvent', {user: user})}
        style={styles.createEvent}>
        <Text style={styles.buttonText}>Create An Event</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  list: {height: '83%'},
  createEvent: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 250,
    height: 50,
    justifyContent: 'center',
    borderRadius: 40,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // shadowRadius: 2,

    margin: 20,
  },
  orgTitle: {
    fontSize: 24,
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: '500',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default AdminEventsScreen;

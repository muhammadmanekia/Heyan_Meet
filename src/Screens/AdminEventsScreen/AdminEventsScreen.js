import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import EventsScreen from '../EventsScreen/EventsScreen';
import {useNavigation} from '@react-navigation/core';
import {Auth} from 'aws-amplify';

const AdminEventsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    Auth.currentAuthenticatedUser({bypassCache: true}).then(user => {
      setUser(user.attributes);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.orgTitle}>{user && user.name} </Text>
      <Pressable
        onPress={() => navigation.navigate('CreateEvent', {user: user})}
        style={styles.createEvent}>
        <Text style={styles.buttonText}>Create An Event</Text>
      </Pressable>
      <Text style={styles.subtitle}>Events Coming Up</Text>
      <View style={styles.list}>
        <EventsScreen showRSVP={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  list: {height: '90%'},
  createEvent: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 150,
    height: 30,
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    margin: 20,
  },
  orgTitle: {
    fontSize: 24,
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default AdminEventsScreen;

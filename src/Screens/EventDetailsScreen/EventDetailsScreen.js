import {View, Text, Image, StyleSheet, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useRoute} from '@react-navigation/core';

const EventDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  console.log(route.params);

  function handleOnPress() {
    requestAnimationFrame(() => {
      setModalVisible(!modalVisible);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.thisevent.details.title}</Text>
      <Image
        source={{uri: route.params.thisevent.details.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/535/535188.png',
            }}
            style={styles.icon}
          />
          <Text>{route.params.thisevent.details.location}</Text>
        </View>
        <View style={styles.info}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/833/833593.png',
            }}
            style={styles.icon}
          />
          <Text>{route.params.thisevent.details.date}</Text>
        </View>
        <View style={styles.buttonWrap}>
          <Pressable>
            <Text style={styles.button} onPress={handleOnPress}>
              RSVP
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
      <Modal transparent visible={modalVisible}>
        <RSVPModal
          handleOnPress={handleOnPress}
          info={{
            details: {
              date: 'Nov 4 2022',
              image: 'https://momin.org/news/uploads/JUmma%202022.jpeg',
              location: 'Momin Center',
              title: 'Jumma Salaat',
            },
            id: 1,
            organization: 'Momin Center',
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Damascus',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    height: 350,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 6,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
  },
  infoContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
  },
  buttonWrap: {
    backgroundColor: '#3bc14a',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    left: '85%',
    top: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EventDetailsScreen;

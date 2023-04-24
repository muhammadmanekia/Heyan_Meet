import {View, Text, Image, StyleSheet, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useRoute} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import {useEffect} from 'react';
import {Storage} from 'aws-amplify';

const EventDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [rsvpd, setRsvpd] = useState(false);

  const route = useRoute();

  const {thisEvent} = route.params;

  const [banner, setBanner] = useState();
  useEffect(() => {
    const downloadImg = async () => {
      var getBanner = await Storage.get(thisEvent.banner);
      setBanner(getBanner);
    };
    downloadImg();
    setRsvpd(thisEvent.rsvpd);
  }, [thisEvent, reloadKey]);

  function handleOnPress(event) {
    requestAnimationFrame(() => {
      setModalVisible(!modalVisible);
    });
  }
  function handleReload() {
    setReloadKey(reloadKey + 1);
  }
  return (
    <View style={styles.container} key={reloadKey}>
      <Text style={styles.title}>{thisEvent.title}</Text>
      <FastImage
        source={{uri: banner, priority: FastImage.priority.normal}}
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
          <Text>{thisEvent.streetAddress}</Text>
        </View>
        <View style={styles.info}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/833/833593.png',
            }}
            style={styles.icon}
          />
          <Text>
            {new Date(thisEvent.startDateTime).toDateString()} ,{' '}
            {new Date(thisEvent.startDateTime).toLocaleTimeString()}
          </Text>
        </View>
        {!rsvpd ? (
          <View style={styles.buttonWrap}>
            <Pressable onPress={handleOnPress}>
              <Text style={styles.button}>RSVP</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.disabledButtonWrap}>
            <Pressable onPress={handleOnPress}>
              <Text style={styles.disabledButton}>RSVPD</Text>
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{thisEvent.description}</Text>
      </View>
      <Modal transparent visible={modalVisible}>
        <RSVPModal
          handleOnPress={handleOnPress}
          handleReload={handleReload}
          info={thisEvent}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginTop: 20,
  },
  image: {
    aspectRatio: 1 / 1,
    marginVertical: 20,
    width: '100%',
    alignSelf: 'center',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  descriptionContainer: {
    padding: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonWrap: {
    backgroundColor: 'black',
    width: 100,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonWrap: {
    backgroundColor: '#ccc',
    width: 100,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default EventDetailsScreen;

import {View, Text, Image, StyleSheet, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import RSVPModal from '../../Components/RSVPModal/RSVPModal';
import {useRoute} from '@react-navigation/core';
import {S3Image} from 'aws-amplify-react-native/dist/Storage';

const EventDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const route = useRoute();

  const {thisEvent} = route.params;

  function handleOnPress() {
    requestAnimationFrame(() => {
      setModalVisible(!modalVisible);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{thisEvent.title}</Text>
      <S3Image
        imgKey={thisEvent.banner}
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
        <Text style={styles.description}>{thisEvent.description}</Text>
      </View>
      <Modal transparent visible={modalVisible}>
        <RSVPModal handleOnPress={handleOnPress} info={thisEvent} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // justifyContent: 'center',
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
    marginVertical: 10,
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
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 15,
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

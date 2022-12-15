import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';

const EventsListItem = ({event, handleOnPress, showRSVP}) => {
  function handleRSVPPress() {
    handleOnPress(event);
  }
  return (
    <View>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: event.details.image}}
          style={styles.image}
          imageStyle={{
            borderRadius: 30,
            resizeMode: 'cover',
          }}>
          <View style={styles.description}>
            <Text style={styles.title}>{event.details.title}</Text>
            <View style={styles.specs}>
              <View style={styles.address}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/535/535188.png',
                  }}
                  style={styles.icon}
                />
                <Text style={styles.specsText}>{event.details.location}</Text>
              </View>
              <View style={styles.date}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/833/833593.png',
                  }}
                  style={styles.icon}
                />
                <Text style={styles.specsText} numberOfLines={2}>
                  {event.details.date}
                </Text>
              </View>
            </View>
            {showRSVP && (
              <View style={styles.buttonWrap}>
                <Pressable>
                  <Text style={styles.button} onPress={handleRSVPPress}>
                    RSVP
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default EventsListItem;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 350,
    height: 210,
    borderRadius: 30,
    position: 'relative',
    margin: 20,
  },

  description: {
    backgroundColor: 'white',
    marginTop: 'auto',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: 5,
  },
  specs: {
    flexDirection: 'row',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 4,
  },
  specsText: {
    fontSize: 16,
  },
  address: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

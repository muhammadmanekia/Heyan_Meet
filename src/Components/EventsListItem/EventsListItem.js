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
import {S3Image} from 'aws-amplify-react-native/dist/Storage';

const EventsListItem = ({event, handleOnPress, showRSVP}) => {
  function handleRSVPPress() {
    handleOnPress(event);
  }
  return (
    <View>
      <View style={styles.container}>
        <View style={{height: 190}}>
          <S3Image
            imgKey={event.banner}
            style={styles.image}
            imageStyle={{
              borderRadius: 30,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.specs}>
            <View style={styles.address}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/535/535188.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.specsText}>{event.streetAddress}</Text>
            </View>
            <View style={styles.date}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/833/833593.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.specsText} numberOfLines={2}>
                {new Date(event.startDateTime).toDateString()}
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
      </View>
    </View>
  );
};

export default EventsListItem;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    marginVertical: 2,
    width: '100%',
  },
  image: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    borderRadius: 30,
    position: 'relative',
    margin: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: StyleSheet.hairlineWidth,
  },

  description: {
    backgroundColor: 'white',
    marginTop: 'auto',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: StyleSheet.hairlineWidth,
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
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 15,
    position: 'absolute',
    left: '88%',
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
  },
});

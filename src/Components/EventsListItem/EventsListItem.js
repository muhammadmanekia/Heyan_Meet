import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {S3Image} from 'aws-amplify-react-native/dist/Storage';
import {useEffect} from 'react';
import {useState} from 'react';
import {Storage} from 'aws-amplify';
import FastImage from 'react-native-fast-image';

const EventsListItem = ({event, handleOnPress, showRSVP, setRSVP}) => {
  const [rsvpd, setRsvpd] = useState(false);

  function handleRSVPPress() {
    handleOnPress(event);
  }

  const [banner, setBanner] = useState();
  useEffect(() => {
    const downloadImg = async () => {
      var getBanner = await Storage.get(event.banner);
      setBanner(getBanner);
    };
    downloadImg();

    setRsvpd(event.rsvpd);
  }, [event]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.bannerContainer}>
          <Image source={{uri: banner}} style={styles.bannerImage} />
        </View>
        <View style={styles.description}>
          <Text style={styles.title} adjustsFontSizeToFit>
            {event.title}
          </Text>
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
          {showRSVP &&
            (!rsvpd ? (
              <View style={styles.buttonWrap}>
                <Pressable onPress={handleRSVPPress}>
                  <Text style={styles.button}>RSVP</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.disabledButtonWrap}>
                <Pressable onPress={handleRSVPPress}>
                  <Text style={styles.disabledButton}>RSVP'D</Text>
                </Pressable>
              </View>
            ))}
        </View>
        {event.paymentAmount ? (
          <View style={styles.paymentWrap}>
            <Pressable>
              <Text style={styles.paymentButton} onPress={handleRSVPPress}>
                $
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default EventsListItem;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 2,
    width: '100%',
  },
  bannerContainer: {
    height: 190,
  },
  bannerImage: {
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
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 10,
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
    width: 80,
    height: 40,
    borderRadius: 25,
    position: 'absolute',
    right: 0,
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButtonWrap: {
    backgroundColor: 'lightgray',
    width: 80,
    height: 40,
    borderRadius: 25,
    position: 'absolute',
    right: 0,
    top: -40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  disabledButton: {
    color: 'black',
    fontWeight: 'bold',
  },
  paymentWrap: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    left: '90%',
    top: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Auth} from 'aws-amplify';
import {useEffect} from 'react';

const SettingsScreen = () => {
  const [user, setUser] = useState();
  const [newAttributes, setNewAttributes] = useState();

  useEffect(() => {
    var userInfo = true;
    async function getUser() {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      if (userInfo) {
        setUser(authUser);
        setNewAttributes(authUser.attributes);
      }
    }
    getUser();
    return () => {
      userInfo = false;
    };
  }, []);

  async function updateAttribute() {
    const response = await Auth.updateUserAttributes(user, newAttributes);
  }

  async function deleteUser() {
    try {
      const result = await Auth.deleteUser();
    } catch (error) {
      console.log('Error deleting user', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.signOutButton}>
        <Pressable
          style={styles.signOutContainer}
          onPress={() => Auth.signOut()}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/126/126467.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Personal Information</Text>
        <View>
          <Text>Name</Text>
          <TextInput
            id="name"
            style={styles.input}
            value={newAttributes && newAttributes.name}
            onChangeText={e => setNewAttributes({...newAttributes, name: e})}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            id="email"
            style={styles.input}
            value={newAttributes && newAttributes.email}
            onChangeText={e => setNewAttributes({...newAttributes, email: e})}
          />
        </View>
        <View>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={user && user.attributes.phone_number}
            onChangeText={e => setNewAttributes({...newAttributes, email: e})}
          />
        </View>
        <Pressable style={styles.saveInfo} onPress={updateAttribute}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2546/2546743.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Update Info</Text>
        </Pressable>
        <Pressable style={styles.signOutContainer} onPress={deleteUser}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2782/2782988.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>
            Delete {user && user.attributes.profile}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  signOutButton: {
    alignSelf: 'center',
    width: 300,
    textAlign: 'center',
  },
  subContainer: {
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  signOutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    height: 36,
    width: 284,
    textAlignVertical: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
  },
  saveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#3DB589',
    margin: 10,
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default SettingsScreen;

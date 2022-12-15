import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Auth} from 'aws-amplify';

const SettingsScreen = () => {
  return (
    <View>
      <Pressable style={styles.searchContainer} onPress={() => Auth.signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

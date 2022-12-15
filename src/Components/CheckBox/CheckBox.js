import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CheckBox = props => {
  const iconName = props.isChecked ? 'black' : 'white';

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onPress} style={{backgroundColor: iconName}} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    marginTop: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '600',
  },
});

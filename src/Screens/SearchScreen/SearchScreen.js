import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Organizations</Text>
      <View style={styles.inputField}>
        <TextInput
          onChangeText={e => onChange(e, 'name')}
          placeholder="Please Enter An Organization"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginHorizontal: 20,
    marginBottom: 5,
    fontFamily: 'Damascus',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  inputField: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default SearchScreen;

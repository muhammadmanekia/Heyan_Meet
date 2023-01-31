import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const OrgListItem = ({org, handleDelete, deleteToggle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        {/* <Image
          source={{
            uri: org.url,
          }}
          style={styles.logo}
        /> */}
      </View>
      <View style={styles.content}>
        {deleteToggle && (
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDelete(org)}>
            <Text style={styles.deleteText}>-</Text>
          </Pressable>
        )}
        <Text style={styles.title} numberOfLines={2}>
          {org.Organization && org.Organization.name}
        </Text>
      </View>
    </View>
  );
};

export default OrgListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: 20,
    marginVertical: 5,
    height: 90,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  logoWrap: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  deleteButton: {
    width: 25,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 13,
    marginRight: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 'auto',
  },
  deleteText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});

import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const OrgListItem = ({org}) => {
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
        <Text style={styles.title} numberOfLines={2}>
          {org && org.name}
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
    justifyContent: 'center',
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

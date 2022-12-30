import {View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import orgs from '../../../assets/data/orgs.json';
import OrgListItem from '../../Components/OrgListItem/OrgListItem';
import {useNavigation} from '@react-navigation/core';
import {Auth, API, graphqlOperation} from 'aws-amplify';

const OrgsScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    API.graphql(graphqlOperation());

    return () => {
      second;
    };
  }, [third]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organizations</Text>
      <FlatList
        data={orgs}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Events', {
                orgTitle: item.details.title,
                showRSVP: true,
              })
            }>
            <OrgListItem org={item} />
          </Pressable>
        )}
      />
      <Pressable
        style={styles.searchContainer}
        onPress={() => navigation.navigate('SearchScreen')}
      />
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
  searchContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 25,
  },

  icon: {
    width: 20,
    height: 20,
    margin: 4,
  },
  title: {
    fontSize: 24,
    marginHorizontal: 20,
    marginBottom: 5,
    fontFamily: 'Damascus',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default OrgsScreen;

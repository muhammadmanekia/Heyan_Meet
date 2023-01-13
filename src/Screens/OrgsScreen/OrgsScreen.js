import {View, Text, FlatList, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import orgs from '../../../assets/data/orgs.json';
import OrgListItem from '../../Components/OrgListItem/OrgListItem';
import {useNavigation} from '@react-navigation/core';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {customSubscribes} from '../../graphql/customqueries';
import {listSubscribes} from '../../graphql/queries';
import {useIsFocused} from '@react-navigation/native';

const OrgsScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [subscribed, setSubscribed] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    let checkAPISubscribed = true;
    async function getUser() {
      var subsArr = [];
      if (checkAPISubscribed) {
        const thisUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        const _subscribed = await API.graphql(
          graphqlOperation(listSubscribes, {
            filter: {userID: {eq: thisUser.attributes.sub}},
          }),
        );
        _subscribed?.data?.listSubscribes?.items.map(sub => {
          if (sub._deleted != true) {
            subsArr.push(sub);
          }
        });
        setUser(thisUser);
        setSubscribed(subsArr);
      }
    }
    getUser();
    return () => {
      checkAPISubscribed = false;
    };
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organizations</Text>
      <FlatList
        data={subscribed}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Events', {
                orgTitle: item.Organization.name,
                orgId: item.Organization.id,
                showRSVP: true,
              })
            }>
            <OrgListItem org={item.Organization} />
          </Pressable>
        )}
      />
      <Pressable
        style={styles.searchContainer}
        onPress={() =>
          navigation.navigate('SearchScreen', {
            user: user.attributes,
            subscribed: subscribed,
          })
        }>
        <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/54/54481.png'}}
          style={styles.icon}
        />
        <Text>Search Organizations</Text>
      </Pressable>
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
    width: 200,
    height: 50,
    backgroundColor: 'rgb(245, 245, 245)',
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 25,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default OrgsScreen;

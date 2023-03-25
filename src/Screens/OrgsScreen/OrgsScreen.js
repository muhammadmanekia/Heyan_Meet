import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import orgs from '../../../assets/data/orgs.json';
import OrgListItem from '../../Components/OrgListItem/OrgListItem';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import {listSubscribes} from '../../graphql/queries';
import {useIsFocused} from '@react-navigation/native';
import {deleteSubscribe} from '../../graphql/mutations';

const OrgsScreen = () => {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const route = useRoute();

  const {user} = route.params;
  const isFocused = useIsFocused();

  async function handleDelete(org) {
    try {
      const response = await API.graphql(
        graphqlOperation(deleteSubscribe, {
          input: {
            id: org.id,
            _version: org._version,
          },
        }),
      );
      if (response) {
        setDeleteToggle(!deleteToggle);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (loading) {
      return;
    }
    let checkAPISubscribed = true;
    setLoading(true);

    async function getUser() {
      var subsArr = [];
      if (checkAPISubscribed) {
        const _subscribed = await API.graphql(
          graphqlOperation(listSubscribes, {
            filter: {userID: {eq: user && user.attributes.sub}},
          }),
        );
        _subscribed?.data?.listSubscribes?.items.map(sub => {
          if (sub._deleted != true) {
            subsArr.push(sub);
          }
        });
        setSubscribed(subsArr);
        // subscribed.map(sub => console.log(sub.Organization.email));
        setLoading(false);
      }
    }
    getUser();
    return () => {
      checkAPISubscribed = false;
    };
  }, [isFocused, deleteToggle]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Organizations</Text>
        {subscribed.length > 0 && (
          <Pressable
            style={styles.deleteOrganization}
            onPress={() => setDeleteToggle(!deleteToggle)}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: 16,
                textAlign: 'center',
              }}>
              {deleteToggle ? 'cancel' : 'unsubscribe'}
            </Text>
          </Pressable>
        )}
      </View>
      {subscribed.length > 0 ? (
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
              <OrgListItem
                org={item}
                deleteToggle={deleteToggle}
                handleDelete={handleDelete}
              />
            </Pressable>
          )}
        />
      ) : (
        <Text style={{textAlign: 'center', padding: 10}}>
          You haven't subscribed to any organizations
        </Text>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteOrganization: {
    backgroundColor: 'black',
    marginBottom: 20,
    borderRadius: 25,
    height: 20,
    marginRight: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 'auto',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 4,
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 5,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default OrgsScreen;

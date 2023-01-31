import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listOrganizations} from '../../graphql/queries';
import {useNavigation, useRoute} from '@react-navigation/core';
import {createSubscribe} from '../../graphql/mutations';

const SearchScreen = () => {
  const [orgsList, setOrgsList] = useState([]);
  const [filteredList, setFilteredList] = useState(orgsList);
  const route = useRoute();
  const {user, subscribed} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    var orgsTempArr = [];
    async function listOrgs() {
      await API.graphql(graphqlOperation(listOrganizations)).then(orgs => {
        orgs.data?.listOrganizations?.items.map(item => {
          if (item._deleted != true) {
            orgsTempArr.push(item);
          }
        });
        setOrgsList(orgsTempArr);
        setFilteredList(orgsTempArr);
      });
    }
    listOrgs();
  }, []);

  const handleSubmit = item => {
    if (
      subscribed
        .map(sub => {
          return sub.Organization.id;
        })
        .includes(item.id)
    ) {
      navigation.goBack();

      return;
    }
    var inputField = {
      userID: user && user.sub,
      organizationID: item.id,
    };
    API.graphql(graphqlOperation(createSubscribe, {input: inputField}));
    navigation.goBack();
  };
  const searchItems = searchValue => {
    if (searchValue !== '') {
      const filteredData = orgsList.filter(item => {
        return item.name
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase());
      });
      setFilteredList(filteredData);
    } else {
      setFilteredList(orgsList);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Organizations</Text>
      <View style={styles.inputField}>
        <TextInput
          onChangeText={e => searchItems(e)}
          placeholder="Please Enter An Organization"
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredList}
        renderItem={({item, index}) => (
          <Pressable onPress={() => handleSubmit(item)}>
            <Text style={styles.listItem}>{item.name}</Text>
          </Pressable>
        )}
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
  list: {
    padding: 20,
  },
  listItem: {
    padding: 10,
    fontSize: 20,
  },
});

export default SearchScreen;

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';

const AdminEventInfo = () => {
  const navigation = useNavigation();
  var rsvpArrdemo = [
    'Ali',
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Abdulkhader',
    'Abdullah',
    'Abdul-Majeed',
    'Abdulmalik',
    'Abdul-Rehman',
    'Abdur',
    'Abdurraheem',
    'Abdur-Rahman',
    'Abdur-Rehmaan',
    'Abel',
    'Abhinav',
    'Abhisumant',
    'Abid',
    'Abir',
    'Abraham',
    'Abu',
    'Ace',
    'Adain',
    'Adam',
    'Adam-James',
    'Addison',
    'Addisson',
    'Adegbola',
    'Adegbolahan',
    'Aden',
    'Adenn',
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jumma Salaat</Text>
      <View style={styles.previewContainer}>
        <Pressable
          onPress={() => navigation.navigate('EventDetails')}
          style={styles.previewButtonContainer}>
          <Text style={styles.previewButton}>Preview Event Ad</Text>
        </Pressable>
      </View>
      <View>
        <View style={styles.subContainer}>
          <Text style={styles.subtitle}>RSVPs</Text>
          <Text style={styles.subtitle}>{rsvpArrdemo.length}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={rsvpArrdemo}
          renderItem={({item, index}) => (
            <Text style={styles.listItem}>
              {index + 1}. {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 8,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  previewButtonContainer: {
    backgroundColor: '#4D5057',
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    margin: 20,
  },
  previewButton: {
    alignSelf: 'center',
    color: 'white',
  },
  list: {
    height: '80%',
  },
  listItem: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 18,
  },
});

export default AdminEventInfo;

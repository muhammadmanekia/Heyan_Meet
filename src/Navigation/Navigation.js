import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EventsScreen from '../Screens/EventsScreen/EventsScreen';
import OrgsScreen from '../Screens/OrgsScreen/OrgsScreen';
import EventDetailsScreen from '../Screens/EventDetailsScreen/EventDetailsScreen';
import AdminEventsScreen from '../Screens/AdminEventsScreen/AdminEventsScreen';
import CreateEventsScreen from '../Screens/CreateEventsScreen/CreateEventsScreen';
import IosFonts from '../Components/Fonts';
import AdminEventInfo from '../Screens/AdminEventInfo/AdminEventInfo';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import SignInScreen from '../Screens/AuthScreens/SignInScreen/SignInScreen';
import SignUpScreen from '../Screens/AuthScreens/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from '../Screens/AuthScreens/ResetPasswordScreen/ResetPasswordScreen';
import ConfirmSignUpScreen from '../Screens/AuthScreens/ConfirmSignUpScreen/ConfirmSignUpScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import {Auth, Hub} from 'aws-amplify';
import SettingsScreen from '../Screens/SettingsScreen/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
      console.log('Auth', authUser.attributes.profile);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const BottomTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: () => {
            var url;
            if (route.name === 'organizations') {
              url = 'https://cdn-icons-png.flaticon.com/512/681/681494.png';
            } else if (route.name === 'Settings') {
              url = 'https://cdn-icons-png.flaticon.com/512/2040/2040504.png';
            } else {
              url = 'https://cdn-icons-png.flaticon.com/512/25/25694.png';
            }

            return (
              <Image
                source={{
                  uri: url,
                }}
                style={{width: 20, height: 20}}
              />
            );
          },
        })}>
        <Tab.Screen
          name={user.attributes.profile === 'user' ? 'Tabs' : 'AdminHome'}
          component={
            user.attributes.profile === 'user' ? OrgsScreen : AdminEventsScreen
          }
          initialParams={{orgTitle: user.attributes.name, user: user}}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'PoiretOne-Regular',
          },
          headerTitle: 'heyan',
        }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="Organizations" component={BottomTabs} />
            <Stack.Screen
              name="Tabs"
              component={OrgsScreen}
              initialParams={{user: user}}
            />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
            <Stack.Screen name="AdminInfo" component={AdminEventInfo} />
            <Stack.Screen name="CreateEvent" component={CreateEventsScreen} />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ConfirmSignUp"
              component={ConfirmSignUpScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import {View, Text, ActivityIndicator} from 'react-native';
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
import SignInScreen from '../Screens/SignInScreen/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';
import ResetPasswordScreen from '../Screens/ResetPasswordScreen/ResetPasswordScreen';
import ConfirmSignUpScreen from '../Screens/ConfirmSignUpScreen/ConfirmSignUpScreen';
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
        console.log(data);
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
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={
            user.attributes.profile === 'user' ? 'organizations' : 'AdminHome'
          }
          component={
            user.attributes.profile === 'user' ? OrgsScreen : AdminEventsScreen
          }
          initialParams={{orgTitle: user.attributes.name}}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="Tabs" component={BottomTabs} />
            <Stack.Screen name="Organizations" component={OrgsScreen} />
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

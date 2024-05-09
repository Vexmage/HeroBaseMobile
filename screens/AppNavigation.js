import React from 'react';
import { View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import CreateCharacterScreen from './CreateCharacterScreen';
import ListCharactersScreen from './ListCharactersScreen';

import { UserProvider, useUser } from '../UserContext';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const { user, logoutUser } = useUser();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStackScreen"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Text style={{ marginRight: 10 }}>Hello, {user}</Text>
              <Ionicons name="log-out-outline" size={25} onPress={logoutUser} />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="CreateCharacter"
        component={CreateCharacterScreen}
        options={{ title: 'Create Character' }}
      />
      <Stack.Screen
        name="ListCharacters"
        component={ListCharactersScreen}
        options={{ title: 'View Characters' }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { user } = useUser();

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="HomeDrawerScreen" component={HomeStack} options={{ title: 'Home' }} />
          {/* Additional screens can be added here */}
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}

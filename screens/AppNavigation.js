import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import CreateCharacterScreen from './CreateCharacterScreen';
import ListCharactersScreen from './ListCharactersScreen';
import CharacterDetailScreen from './CharacterDetailScreen';

import { UserProvider, useUser } from '../UserContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const { user, logoutUser } = useUser();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
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
        options={{ title: 'List Characters' }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{ title: 'Character Details' }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { user } = useUser();

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
          {/* Additional drawer items can be added here if needed */}
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

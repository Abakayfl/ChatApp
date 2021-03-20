// import react native gesture handler


import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

import React from 'react';

import Start from './components/Start';
import Chat from './components/Chat';

const firebaseConfig = {
  apiKey: "AIzaSyB9TZiLRk-tY5Ij7P2qABveGzFxslPP2bU",
  authDomain: "test-be478.firebaseapp.com",
  projectId: "test-be478",
  storageBucket: "test-be478.appspot.com",
  messagingSenderId: "445563747446",
  appId: "1:445563747446:web:bd493792f50063c60bb357",
  measurementId: "G-LNZM1J2EK3"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
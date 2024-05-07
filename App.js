// import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
// import {Appbar,TextInput,Button} from'react-native-paper'
import Theme from './screens/Theme'
import Login from './screens/Login'
import Register from './screens/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {name} from './app.json'
import { AppRegistry } from 'react-native'

const Stack = createStackNavigator();
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Register' component={Register}></Stack.Screen>
        <Stack.Screen name='Theme' component={Theme}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
export default App


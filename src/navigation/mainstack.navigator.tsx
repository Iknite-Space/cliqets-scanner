import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Events, Home, Tables, Scanner, Sync} from '../screens';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Sync">
      <Stack.Screen
        name="Sync"
        options={{headerShown: false}}
        component={Sync}
      />
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        name="Events"
        options={{headerShown: false}}
        component={Events}
      />
      <Stack.Screen
        name="Scanner"
        options={{headerShown: false}}
        component={Scanner}
      />
      <Stack.Screen
        name="Tables"
        options={{headerShown: false}}
        component={Tables}        
      />
    </Stack.Navigator>
  );
};

export default MainStack;

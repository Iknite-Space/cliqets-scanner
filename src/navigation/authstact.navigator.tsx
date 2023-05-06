import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Register, Verification} from '../screens';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={Register}
      />
      <Stack.Screen
        name="Verification"
        options={{headerShown: false}}
        component={Verification}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

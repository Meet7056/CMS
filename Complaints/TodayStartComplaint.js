// In App.js in a new project

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TodayComplaintStart from './StartComplaint';
import PendingComplaint from './PendingComplaints';

import AddPartsPopUpScreen from './popUpScreenToday';

const Stack = createStackNavigator();

const App = () => {

  return (
      <Stack.Navigator
        initialRouteName="TodayComplaint"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TodayComplaint" component={PendingComplaint} />
        <Stack.Screen name="TodayStartComplaint" component={TodayComplaintStart} />
        <Stack.Screen name="AddPartsScreen" component={AddPartsPopUpScreen} />
      </Stack.Navigator>
  );
};

export default App;

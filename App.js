import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './screens/Main';
import SplashActivity from './src/utils/SplashActivity';
import DetailsScreen from './screens/Settings';
import { requestUserPermission } from "./src/utils/notificationHeloper";

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    requestUserPermission();
  }, [])
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Splash"
        component={SplashActivity}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
}

export default App;

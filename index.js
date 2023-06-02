
import {name as appName} from './app.json';


// index.js
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

// Create a navigationRef to access the NavigationContainer's methods
export const navigationRef = React.createRef();

// Wrap the App component with the NavigationContainer and pass the navigationRef
const AppContainer = () => (
  <NavigationContainer ref={navigationRef } >
    <App />
  </NavigationContainer>
);

// Register the AppContainer component
AppRegistry.registerComponent(appName, () => AppContainer);

// ...

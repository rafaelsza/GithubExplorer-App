import React from 'react';
import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#f0f0f5" />
    <Routes />
  </NavigationContainer>
);

export default App;

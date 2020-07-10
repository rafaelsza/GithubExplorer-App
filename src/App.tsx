import React from 'react';
import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <AppProvider>
    <StatusBar barStyle="dark-content" backgroundColor="#f0f0f5" />
    <Routes />
  </AppProvider>
);

export default App;

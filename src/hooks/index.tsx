import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RepositoryProvider } from './repositories';

const AppProvider: React.FC = ({ children }) => {
  return (
    <RepositoryProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </RepositoryProvider>
  );
};

export default AppProvider;

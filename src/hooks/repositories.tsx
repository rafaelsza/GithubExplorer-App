/* eslint-disable camelcase */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export interface Repository {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepositoryContext {
  repositories: Repository[];
  addRepository(input: string): Promise<boolean>;
  removeRepository(id: number): void;
}

const RepositoryContext = createContext<RepositoryContext>(
  {} as RepositoryContext,
);

const RepositoryProvider: React.FC = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      const storageRepositories = await AsyncStorage.getItem(
        '@GithubExplorerApp:repositories',
      );

      if (storageRepositories) {
        setRepositories(JSON.parse(storageRepositories));
      }
    }

    loadRepositories();
  }, []);

  const addRepository = useCallback(
    async (input: string): Promise<boolean> => {
      try {
        const response = await api.get<Repository>(`repos/${input}`);

        await AsyncStorage.setItem(
          '@GithubExplorerApp:repositories',
          JSON.stringify([...repositories, response.data]),
        );

        setRepositories([...repositories, response.data]);

        return true;
      } catch (error) {
        Alert.alert(
          'Repositório não encontrado, confira o autor e nome do repositório!',
        );
        return false;
      }
    },
    [repositories],
  );

  const removeRepository = useCallback(
    async (id: number) => {
      const newRepositories = repositories.filter(
        repository => repository.id !== id,
      );

      setRepositories(newRepositories);

      await AsyncStorage.setItem(
        '@GithubExplorerApp:repositories',
        JSON.stringify(newRepositories),
      );
    },
    [repositories],
  );

  const value = useMemo(
    () => ({
      repositories,
      addRepository,
      removeRepository,
    }),
    [repositories, addRepository, removeRepository],
  );

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  );
};

function useRepository(): RepositoryContext {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw new Error('useRepository must be used within a RepositoryProvider');
  }

  return context;
}

export { RepositoryProvider, useRepository };

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import uuid from 'react-native-uuid';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export interface Repository {
  id: string;
  fullName: string;
  description: string;
  counts: {
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;
  };
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface RepositoryContext {
  repositories: Repository[];
  addRepository(input: string): Promise<boolean>;
  removeRepository(id: string): void;
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
        const response = await api.get(`repos/${input}`);

        const repository: Repository = {
          id: uuid.v4(),
          fullName: response.data.full_name,
          description: response.data.description,
          counts: {
            stargazersCount: response.data.stargazers_count,
            forksCount: response.data.forks_count,
            openIssuesCount: response.data.open_issues_count,
          },
          owner: {
            login: response.data.owner.login,
            avatarUrl: response.data.owner.avatar_url,
          },
        };

        await AsyncStorage.setItem(
          '@GithubExplorerApp:repositories',
          JSON.stringify([...repositories, repository]),
        );

        setRepositories([...repositories, repository]);

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
    async (id: string) => {
      setRepositories(state =>
        state.filter(repository => repository.id !== id),
      );

      await AsyncStorage.setItem(
        '@GithubExplorerApp:repositories',
        JSON.stringify(repositories),
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

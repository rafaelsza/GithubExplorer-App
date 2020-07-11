/* eslint-disable camelcase */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Repository, useRepository } from '../../hooks/repositories';

import api from '../../services/api';

import logoBackground from '../../assets/github-background.png';
import logoHeader from '../../assets/logo.png';

import InformationsRepository from '../../components/InformationsRepository';
import ItemList from '../../components/ItemList';

import {
  Container,
  ViewRepository,
  ImageRepository,
  DataRepository,
  TitleRepository,
  DescriptionRepository,
  ViewData,
  ViewItemData,
  TitleItemData,
  ValueItemData,
  TitleHeaderIssues,
} from './styles';

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

interface Params {
  repository: Repository;
}

const RepositoryDetails: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as Params;
  const { repository } = routeParams;

  const { removeRepository } = useRepository();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorFavoriteButton, setColorFavoriteButton] = useState('red');

  useEffect(() => {
    async function loadIssues() {
      const response = await api.get<Issue[]>(
        `repos/${repository.full_name}/issues`,
      );

      setIssues(response.data);
      setLoading(false);
    }

    loadIssues();
  }, [repository.full_name]);

  const handleOpenUrl = useCallback(async (url: string) => {
    await Linking.openURL(url);
  }, []);

  return (
    <ImageBackground
      source={logoBackground}
      style={{ flex: 1 }}
      imageStyle={{ width: 328, height: 298 }}
      resizeMode="cover"
    >
      <Container>
        <Image source={logoHeader} />

        <ViewRepository>
          <InformationsRepository
            image={{ url: repository.owner.avatar_url, width: 84, height: 84 }}
            title={repository.full_name}
            description={repository.description}
          />
        </ViewRepository>

        {/* <ViewRepository>
          <ImageRepository
            source={{
              uri: repository.owner.avatar_url,
            }}
          />
          <DataRepository>
            <TitleRepository>{repository.full_name}</TitleRepository>
            <DescriptionRepository>
              {repository.description}
            </DescriptionRepository>
          </DataRepository>
        </ViewRepository> */}
        <ViewData>
          <ViewItemData>
            <ValueItemData>{repository.stargazers_count}</ValueItemData>
            <TitleItemData>Stars</TitleItemData>
          </ViewItemData>
          <ViewItemData>
            <ValueItemData>{repository.forks_count}</ValueItemData>
            <TitleItemData>Forks</TitleItemData>
          </ViewItemData>
          <ViewItemData>
            <ValueItemData>{repository.open_issues_count}</ValueItemData>
            <TitleItemData>Open issues</TitleItemData>
          </ViewItemData>
          <TouchableOpacity
            activeOpacity={1.0}
            onPress={() => {
              removeRepository(repository.id);
              setColorFavoriteButton('#a8a8b3');
            }}
          >
            <FeatherIcon name="heart" size={20} color={colorFavoriteButton} />
          </TouchableOpacity>
        </ViewData>
        <TitleHeaderIssues>Open issues</TitleHeaderIssues>
      </Container>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={issues}
          style={{ paddingHorizontal: 16 }}
          keyExtractor={issue => issue.id.toString()}
          renderItem={({ item: issue }) => (
            <ItemList
              title={issue.title}
              description={issue.user.login}
              iconRight="external-link"
              onPress={() => {
                handleOpenUrl(issue.html_url);
              }}
            />
          )}
        />
      )}
    </ImageBackground>
  );
};

export default RepositoryDetails;

import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Repository, useRepository } from '../../hooks/repositories';

import api from '../../services/api';

import logoBackground from '../../assets/github-background.png';
import logoHeader from '../../assets/logo.png';

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
  id: string;
  title: string;
  htmlUrl: string;
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
      const response = await api.get(`repos/${repository.fullName}/issues`);

      const issuesResponse: Issue[] = response.data.map(issue => ({
        id: issue.id,
        title: issue.title,
        htmlUrl: issue.html_url,
        user: {
          login: issue.user.login,
        },
      }));

      setIssues(issuesResponse);
      setLoading(false);
    }

    loadIssues();
  }, [repository.fullName]);

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
          <ImageRepository
            source={{
              uri: repository.owner.avatarUrl,
            }}
          />
          <DataRepository>
            <TitleRepository>{repository.fullName}</TitleRepository>
            <DescriptionRepository>
              {repository.description}
            </DescriptionRepository>
          </DataRepository>
        </ViewRepository>
        <ViewData>
          <ViewItemData>
            <ValueItemData>{repository.counts.stargazersCount}</ValueItemData>
            <TitleItemData>Stars</TitleItemData>
          </ViewItemData>
          <ViewItemData>
            <ValueItemData>{repository.counts.forksCount}</ValueItemData>
            <TitleItemData>Forks</TitleItemData>
          </ViewItemData>
          <ViewItemData>
            <ValueItemData>{repository.counts.openIssuesCount}</ValueItemData>
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
            <ItemList>
              {{
                title: issue.title,
                description: issue.user.login,
                icon: 'external-link',
                onClick: 'openExternalUrl',
                externalUrl: issue.htmlUrl,
              }}
            </ItemList>
          )}
        />
      )}
    </ImageBackground>
  );
};

export default RepositoryDetails;

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

import ContentItem from '../../components/ContentItem';
import ItemList from '../../components/ItemList';

import {
  Container,
  ViewRepository,
  ViewCountsData,
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
  const { repository } = route.params as Params;

  const { removeRepository } = useRepository();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorFavoriteButton, setColorFavoriteButton] = useState('red');

  const counts = [
    { title: 'Stars', value: repository.stargazers_count },
    { title: 'Forks', value: repository.forks_count },
    { title: 'Open issues', value: repository.open_issues_count },
  ];

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
          <ContentItem
            image={{ url: repository.owner.avatar_url, width: 84, height: 84 }}
            title={repository.full_name}
            description={repository.description}
          />

          <ViewCountsData>
            {counts.map(count => {
              return (
                <ContentItem
                  key={count.title}
                  title={count.value.toString()}
                  description={count.title}
                />
              );
            })}
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => {
                removeRepository(repository.id);
                setColorFavoriteButton('#a8a8b3');
              }}
            >
              <FeatherIcon
                name="heart"
                size={20}
                color={colorFavoriteButton}
                style={{ marginRight: 20, marginLeft: 50 }}
              />
            </TouchableOpacity>
          </ViewCountsData>
        </ViewRepository>
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
              onPress={async () => {
                await Linking.openURL(issue.html_url);
              }}
            />
          )}
        />
      )}
    </ImageBackground>
  );
};

export default RepositoryDetails;

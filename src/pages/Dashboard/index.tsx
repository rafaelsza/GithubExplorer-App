import React, { useState, useCallback } from 'react';
import { ImageBackground, Image, FlatList, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRepository } from '../../hooks/repositories';

import logoBackground from '../../assets/github-background.png';
import logoHeader from '../../assets/logo.png';

import ItemList from '../../components/ItemList';

import {
  TitleText,
  Container,
  Form,
  SearchInput,
  Button,
  ButtonText,
} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [valueSearch, setValueSearch] = useState<string>('');
  const { repositories, addRepository } = useRepository();

  const handleAddRepository = useCallback(async () => {
    const found = await addRepository(valueSearch);

    if (found) {
      setValueSearch('');
      Keyboard.dismiss();
    } else {
      setValueSearch(valueSearch);
    }
  }, [valueSearch, addRepository]);

  return (
    <ImageBackground
      source={logoBackground}
      style={{ flex: 1 }}
      imageStyle={{ width: 328, height: 298 }}
      resizeMode="cover"
    >
      <Container>
        <Image source={logoHeader} />
        <TitleText>Explore repositórios no Github.</TitleText>

        <Form>
          <SearchInput
            autoCapitalize="none"
            onChangeText={setValueSearch}
            defaultValue={valueSearch}
            placeholder="Digite o autor/repositório"
          />
          <Button activeOpacity={0.7}>
            <ButtonText onPress={() => handleAddRepository()}>
              Pesquisar
            </ButtonText>
          </Button>
        </Form>
      </Container>
      <FlatList
        data={repositories}
        style={{ paddingHorizontal: 16 }}
        keyExtractor={repository => repository.id.toString()}
        renderItem={({ item: repository }) => (
          <ItemList
            imageUrl={repository.owner.avatar_url}
            title={repository.full_name}
            description={repository.description}
            iconRight="chevron-right"
            onPress={() => {
              navigation.navigate('RepositoryDetails', { repository });
            }}
          />
        )}
      />
    </ImageBackground>
  );
};

export default Dashboard;

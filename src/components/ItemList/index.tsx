import React, { useCallback } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

import { Repository } from '../../hooks/repositories';

import {
  Container,
  Image,
  TitleAndDescriptionContainer,
  Title,
  Description,
} from './styles';

interface Params {
  children: {
    imageUrl?: string;
    title: string;
    description: string;
    icon: string;
    item?: Repository;
    onClick: 'openRepositoryDetails' | 'openExternalUrl';
    externalUrl?: string;
  };
}

const ItemList: React.FC<Params> = ({ children }: Params) => {
  const navigation = useNavigation();
  const repository = children.item;

  const handleOpenUrl = useCallback(async (url?: string) => {
    if (!url) {
      return;
    }
    await Linking.openURL(url);
  }, []);

  return (
    <Container
      activeOpacity={0.7}
      onPress={
        children.onClick === 'openRepositoryDetails'
          ? () => {
              navigation.navigate('RepositoryDetails', { repository });
            }
          : () => {
              handleOpenUrl(children.externalUrl);
            }
      }
    >
      {!!children.imageUrl && <Image source={{ uri: children.imageUrl }} />}

      <TitleAndDescriptionContainer>
        <Title>{children.title}</Title>
        <Description>{children.description}</Description>
      </TitleAndDescriptionContainer>

      {!!children.icon && (
        <FeatherIcon name={children.icon} size={20} color="#cbcbd6" />
      )}
    </Container>
  );
};

export default ItemList;

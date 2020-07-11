import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Image,
  TitleAndDescriptionContainer,
  Title,
  Description,
} from './styles';

interface ItemListProps extends TouchableOpacityProps {
  imageUrl?: string;
  title: string;
  description: string;
  iconRight: string;
}

const ItemList: React.FC<ItemListProps> = ({
  title,
  description,
  iconRight,
  ...rest
}: ItemListProps) => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      {!!rest.imageUrl && <Image source={{ uri: rest.imageUrl }} />}

      <TitleAndDescriptionContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleAndDescriptionContainer>

      {!!iconRight && (
        <FeatherIcon name={iconRight} size={20} color="#cbcbd6" />
      )}
    </Container>
  );
};

export default ItemList;

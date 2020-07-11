import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacityProps } from 'react-native';

import InformationsRepository from '../InformationsRepository';

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
      {/* {!!rest.imageUrl && (
        <Image source={{ uri: rest.imageUrl }} width={72} height={72} />
      )}

      <TitleAndDescriptionContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleAndDescriptionContainer> */}

      <InformationsRepository
        image={
          rest.imageUrl
            ? { url: rest.imageUrl, width: 72, height: 72 }
            : undefined
        }
        title={title}
        description={description}
      />

      {!!iconRight && (
        <FeatherIcon name={iconRight} size={20} color="#cbcbd6" />
      )}
    </Container>
  );
};

export default ItemList;

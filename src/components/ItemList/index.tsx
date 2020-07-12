import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TouchableOpacityProps } from 'react-native';

import ContentItem from '../ContentItem';

import { Container } from './styles';

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
    <Container
      activeOpacity={0.7}
      {...rest}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
      }}
    >
      <ContentItem
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

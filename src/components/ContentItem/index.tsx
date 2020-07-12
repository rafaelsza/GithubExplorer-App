import React from 'react';

import {
  Container,
  Image,
  TitleAndDescriptionContainer,
  Title,
  Description,
} from './styles';

interface InfoProps {
  image?: {
    url?: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
}

const ContentItem: React.FC<InfoProps> = ({ image, title, description }) => {
  return (
    <Container>
      {!!image && (
        <Image
          source={{ uri: image.url }}
          width={image.width}
          height={image.height}
        />
      )}

      <TitleAndDescriptionContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleAndDescriptionContainer>
    </Container>
  );
};

export default ContentItem;

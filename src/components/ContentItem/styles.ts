import styled from 'styled-components/native';
import { ImageProps } from 'react-native';

export const Container = styled.View`
  flex: 1;
  height: auto;
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image<ImageProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 100px;
  margin-right: 16px;
`;

export const TitleAndDescriptionContainer = styled.View`
  flex: 1;
  height: auto;
  justify-content: space-between;
  padding: 0 5px 0 0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #3d3d4d;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #a8a8b3;
`;

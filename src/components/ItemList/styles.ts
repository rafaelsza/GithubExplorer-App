import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  padding: 16px;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;

  background: #fff;
  border-radius: 3px;
`;

export const Image = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 100px;
  margin-right: 16px;
`;

export const TitleAndDescriptionContainer = styled.View`
  flex: 1;
  height: auto;
  justify-content: space-evenly;
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

import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px 16px 0 16px;
`;

export const TitleText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #3d3d4d;
  margin: 32px 0 8px 0;
`;

export const Form = styled.View`
  width: 100%;
  height: 50px;
  margin: 8px 0 32px 0;

  flex-direction: row;
  align-items: center;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  color: #3a3a3a;
  background: #fff;
  font-size: 14px;

  border-width: 2px;
  border-color: #fff;
  border-style: solid;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 100%;
  background: #04d361;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

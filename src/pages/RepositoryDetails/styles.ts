import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 16px 16px 5px 16px;
`;

export const ViewRepository = styled.View`
  flex-direction: row;
  padding: 32px 0 0 0;
`;

export const ImageRepository = styled.Image`
  width: 84px;
  height: 84px;
  border-radius: 100px;
`;

export const DataRepository = styled.View`
  flex: 1;
  padding: 0 16px;
`;

export const TitleRepository = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #3d3d4d;
`;

export const DescriptionRepository = styled.Text`
  color: #a8a8b3;
  font-size: 14px;
`;

export const ViewData = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;
`;

export const ViewItemData = styled.View`
  flex-direction: column;
`;

export const ValueItemData = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #3d3d4d;
`;

export const TitleItemData = styled.Text`
  color: #a8a8b3;
  font-size: 14px;
`;

export const TitleHeaderIssues = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #3d3d4d;
`;

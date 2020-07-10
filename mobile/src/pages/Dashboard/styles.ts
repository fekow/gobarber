import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;
export const List = styled(FlatList as new () => FlatList<Provider>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

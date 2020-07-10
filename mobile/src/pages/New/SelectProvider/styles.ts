import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from '~/types';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Provider>,
).attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;
export const ProviderInfo = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  align-items: center;
  margin: 0 10px 20px;
`;
export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;
export const Name = styled.Text`
  font-size: 14px;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

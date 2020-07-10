import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Hours } from '~/types';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HourList = styled(FlatList as new () => FlatList<Hours>).attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})``;

export const Hour = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;
  opacity: ${(props: { enabled: boolean }) => (props.enabled ? 1 : 0.6)};

  align-items: center;
  margin: 0 10px 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

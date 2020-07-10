/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import api from '~/services/api';
import { Container, HourList, Hour, Title } from './styles';
import { NewStackParamList } from '~/types';

type NewScreenNavigationProp = StackNavigationProp<
  NewStackParamList,
  'SelectProvider'
>;

type Props = {
  navigation: NewScreenNavigationProp;
  route: any;
};

const SelectDateTime: React.FC<Props> = ({ route, navigation }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;
  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [date, provider]);
  function handleSelectHour(time: string) {
    navigation.navigate('Confirm', { provider, time });
  }
  return (
    <Background>
      <Container>
        <DateInput date={date} change={setDate} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => {
                handleSelectHour(item.value);
              }}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectDateTime;

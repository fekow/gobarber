/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

import { UserStackParamList } from '~/types';

type UserScreenNavigationProp = BottomTabNavigationProp<
  UserStackParamList,
  'Confirm'
>;

type Props = {
  navigation: UserScreenNavigationProp;
  route: any;
};

const Confirm: React.FC<Props> = ({ route, navigation }) => {
  const { provider, time } = route.params;
  // is giving time + 3 hours
  const dateFormated = useMemo(() => {
    return formatRelative(parseISO(time), new Date(), {
      locale: pt,
    });
  }, [time]);

  async function handleAddAppoitment() {
    await api.post('appointments', { provider_id: provider.id, date: time });
    navigation.navigate('Dashboard');
    navigation.reset({
      routes: [{ name: 'SelectProvider' }],
    });
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar?.url
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormated}</Time>
        <SubmitButton onPress={handleAddAppoitment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default Confirm;

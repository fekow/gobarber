import React, { ReactElement, useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Info, Avatar, Name, Time } from './styles';
import { Provider } from '~/pages/Dashboard';

const Appointment = ({
  data,
  onCancel,
}: {
  data: Provider;
  onCancel(): any;
}): ReactElement => {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
    });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar?.url
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>
      {data.cancellable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Appointment;

/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Platform } from 'react-native';

import { Container, DateButton, DateText, Picker } from './styles';

interface Props {
  date: Date;
  change: any;
}

const DateInput: React.FC<Props> = ({ date, change }) => {
  const [opened, setOpened] = useState(false);
  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date],
  );
  function onChange(_: any, newDate?: Date) {
    const currentDate = newDate || date;
    setOpened(Platform.OS === 'ios');
    change(currentDate);
  }
  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormated}</DateText>
      </DateButton>
      {opened && (
        <Picker>
          <DateTimePicker
            value={new Date()}
            onChange={onChange}
            minimumDate={new Date()}
            display="spinner"
            maximumDate={new Date(2030, 10, 20)}
            mode="date"
            locale="pt"
          />
        </Picker>
      )}
    </Container>
  );
};

export default DateInput;

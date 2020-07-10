import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';
import { Container, Title, List } from './styles';
import api from '~/services/api';

export interface Provider {
  past: boolean;
  cancellable: boolean;
  id: number;
  date: string;
  canceled_at?: string;
  provider: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Provider[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadAppointments() {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      }
      loadAppointments();
    }, []),
  );
  async function handleCancel(id: number) {
    const response = await api.delete(`/appointments/${id}`);
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment,
      ),
    );
  }
  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '~/components/Background';
import { Container, ProvidersList, ProviderInfo, Avatar, Name } from './styles';

import api from '~/services/api';
import { Provider } from '~/types';
import { NewStackParamList } from '~/types';

type NewScreenNavigationProp = StackNavigationProp<
  NewStackParamList,
  'SelectProvider'
>;

type Props = {
  navigation: NewScreenNavigationProp;
};

const SelectProvider: React.FC<Props> = ({ navigation }) => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <ProviderInfo
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar?.url
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </ProviderInfo>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectProvider;

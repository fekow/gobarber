import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import SelectProvider from '../pages/New/SelectProvider';
import SelectDateTime from '../pages/New/SelectDateTime';
import Confirm from '../pages/New/Confirm';

import { NewStackParamList } from '~/types';

const New = createStackNavigator<NewStackParamList>();

type NewScreenNavigationProp = StackNavigationProp<
  NewStackParamList,
  'SelectProvider'
>;

type Props = {
  navigation: NewScreenNavigationProp;
};
// FIX ANY
const NewRoutes: React.FC<any> = ({ navigation }) => {
  return (
    <New.Navigator
      initialRouteName="SelectProvider"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: { marginLeft: 20 },
        headerTitleAlign: 'center',
      }}
    >
      <New.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <New.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione o horário',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectProvider')}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <New.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectDateTime')}
            >
              <Icon name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
    </New.Navigator>
  );
};

export default NewRoutes;

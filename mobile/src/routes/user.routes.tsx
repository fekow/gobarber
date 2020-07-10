/* eslint-disable react/prop-types */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import NewRoutes from './new.routes';

const Tab = createBottomTabNavigator();

const UserRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        style: { backgroundColor: '#8d41a8', borderTopColor: 'transparent' },
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: () => (
            <Icon name="event" size={20} color="rgba(255,255,255,0.6)" />
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={NewRoutes}
        options={{
          tabBarLabel: 'Agendar',
          tabBarVisible: false,
          tabBarIcon: () => (
            <Icon
              name="add-circle-outline"
              size={20}
              color="rgba(255,255,255,0.6)"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default UserRoutes;

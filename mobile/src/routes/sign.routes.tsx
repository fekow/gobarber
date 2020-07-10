import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { SignStackParamList } from '~/types';

const Sign = createStackNavigator<SignStackParamList>();
// import { Container } from './styles';

const SignRoutes: React.FC = () => {
  return (
    <Sign.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Sign.Screen name="SignIn" component={SignIn} />
      <Sign.Screen name="SignUp" component={SignUp} />
    </Sign.Navigator>
  );
};

export default SignRoutes;

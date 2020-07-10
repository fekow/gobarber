import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SignRoutes from './sign.routes';
import UserRoutes from './user.routes';
// import { RootStackParamList } from '~/types';

// const RootStack = createStackNavigator();
import { RootState } from '~/store/modules/rootReducer';

const Routes: React.FC = () => {
  const SignedIn = useSelector((state: RootState) => state.auth.signed);
  return SignedIn ? <UserRoutes /> : <SignRoutes />;
};

export default Routes;

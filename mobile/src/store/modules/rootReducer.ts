import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
export default combineReducers({
  auth,
  user,
});
//crio minha tipagem de reducers
const rootReducer = combineReducers({
  auth,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
//fix ts
export default function* rootSaga(): any {
  return yield all([auth, user]);
}

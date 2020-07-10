import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { Profile } from '../moduleTypes';

export function* updateProfile({
  payload,
}: {
  type: string;
  payload: { data: Profile };
}): any {
  try {
    const { name, email, ...rest } = payload.data;
    // crio um objeto com as info do profile
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, '/users', profile);
    yield delay(2000);
    yield put(updateProfileSuccess(response.data));
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');
  } catch (err) {
    Alert.alert(
      'Erro na atualização',
      'Houve um erro na atualização do perfil, verifique os seus dados',
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);

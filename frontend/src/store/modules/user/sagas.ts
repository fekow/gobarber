import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { toast } from 'react-toastify';
import { Profile } from '../moduleTypes';

export function* updateProfile({
  payload,
}: {
  type: string;
  payload: { data: Profile };
}): any {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;
    // crio um objeto com as info do profile
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );
    const response = yield call(api.put, '/users', profile);
    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar seu perfil, verifique seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);

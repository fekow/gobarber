import { all, takeLatest, put, call, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({
  payload,
}: {
  payload: { email: string; password: string };
  type: string;
}): any {
  // aqui faço verificação de login na api
  try {
    const { email, password } = payload;
    const response = yield call(api.post, `/sessions`, {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário nao pode ser prestador de serviços',
      );
      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    // yield delay(2000);
    yield put(signInSuccess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique os seus dados',
    );
    yield put(signFailure());
  }
}

export function* signUp({
  payload,
}: {
  payload: { name: string; email: string; password: string };
  type: string;
}): any {
  try {
    const { name, email, password } = payload;
    yield delay(2000);
    yield call(api.post, '/users', {
      name,
      email,
      password,
    });
    yield put(signUpSuccess());
    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique os seus dados',
    );
    yield put(signFailure());
  }
}
// toda vez q o persist carrega, euu seto o meu token nos headers
export function setToken({
  payload,
}: {
  type: string;
  payload: { auth: { token: string } };
}): any {
  if (!payload) {
    return;
  }
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// posso escutar essa cal do persist rehydrate
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);

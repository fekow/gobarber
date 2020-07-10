import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from 'services/api';
import history from 'services/history';
import { signInSuccess, signFailure } from './actions';

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

    if (!user.provider) {
      toast.error('Usuário não é prestador.');
      return;
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
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
    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });
    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');
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
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut(): any {
  history.push('/');
}

// posso escutar essa cal do persist rehydrate
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);

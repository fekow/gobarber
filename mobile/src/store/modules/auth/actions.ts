import { User } from '../moduleTypes';

export function signInRequest(
  email: string,
  password: string,
): { type: string; payload: { email: string; password: string } } {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}
export function signUpRequest(
  name: string,
  email: string,
  password: string,
): {
  type: string;
  payload: { name: string; email: string; password: string };
} {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      email,
      password,
    },
  };
}
export function signUpSuccess(): { type: string } {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
  };
}
export function signInSuccess(
  token: string,
  user: User,
): {
  type: string;
  payload: {
    token: string;
    user: User;
  };
} {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
      user,
    },
  };
}

export function signFailure(): { type: string } {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut(): { type: string } {
  return {
    type: '@auth/SIGN_OUT',
  };
}

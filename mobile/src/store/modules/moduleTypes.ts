export interface User {
  id: number;
  name: string;
  email: string;
  provider: boolean;
  avatar?: {
    url: string;
    id: number;
    path: string;
  };
}

export interface Profile {
  name: string;
  email: string;
  avatar_id?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export interface userState {
  profile: User;
  loading: boolean;
}

export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = '@user/UPDATE_PROFILE_FAILURE';
export const SIGN_OUT = '@auth/SIGN_OUT';

interface signInAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

interface signOutAction {
  type: typeof SIGN_OUT;
}

interface updateProfileRequestAction {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: {
    profile: User;
    token: string;
  };
}
interface updateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: {
    profile: User;
    token: string;
  };
}
interface updateProfileFailureAction {
  type: typeof UPDATE_PROFILE_FAILURE;
}

export type UserActionTypes =
  | signInAction
  | updateProfileRequestAction
  | updateProfileSuccessAction
  | updateProfileFailureAction
  | signOutAction;

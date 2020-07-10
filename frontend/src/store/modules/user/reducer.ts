import { produce } from 'immer';
import {
  UserActionTypes,
  SIGN_IN_SUCCESS,
  UPDATE_PROFILE,
  SIGN_OUT,
  userState,
} from '../moduleTypes';

// SETAR O TYPO DO INITIAL STATE PRA PERMITIR UNDEFINED
const INITIAL_STATE: userState = {
  profile: {
    id: 0,
    name: '',
    email: '',
    provider: false,
    avatar: {
      url: '',
      id: 0,
      path: '',
    },
  },
};
//fix any
export default function user(
  state = INITIAL_STATE,
  action: UserActionTypes
): userState {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return produce(state, draft => {
        draft.profile = action.payload.user;
      });
    case UPDATE_PROFILE:
      return produce(state, draft => {
        draft.profile = action.payload.profile;
      });
    case SIGN_OUT:
      return produce(state, draft => {
        draft.profile = INITIAL_STATE.profile;
      });

    default:
      return state;
  }
}

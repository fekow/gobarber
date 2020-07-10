import { Profile } from '../moduleTypes';

export function updateProfileRequest(
  data: Profile
): {
  type: string;
  payload: {
    data: Profile;
  };
} {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}
export function updateProfileSuccess(
  profile: Profile
): { type: string; payload: { profile: Profile } } {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function updateProfileFailure(): { type: string } {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

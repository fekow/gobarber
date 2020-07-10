export type SignStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
export type NewStackParamList = {
  SelectProvider: undefined;
  SelectDateTime: { provider: Provider };
  Confirm: { provider: Provider; time: string };
};
export type UserStackParamList = {
  Confirm: undefined;
  Dashboard: undefined;
};
export interface Provider {
  id: number;
  name: string;
  email: string;
  avatar?: {
    url: string;
  };
}

export interface Hours {
  time: string;
  value: string;
  available: boolean;
}

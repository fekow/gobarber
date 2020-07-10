import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { useSelector, useDispatch } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { updateProfileRequest } from 'store/modules/user/actions';
import { signOut } from 'store/modules/auth/actions';
import Input from 'components/Form/input';
import AvatarInput from './AvatarInput';
import { Container } from './styles';
import { RootState } from 'store/modules/rootReducer';

interface FormData {
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const profile = useSelector((state: RootState) => state.user.profile);
  const handleSubmit: SubmitHandler<FormData> = data => {
    dispatch(updateProfileRequest(data));
  };
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} ref={formRef} onSubmit={handleSubmit}>
        <AvatarInput name="avatar" />
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço e-mail" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
        />
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do Gobarber
      </button>
    </Container>
  );
};

export default Profile;

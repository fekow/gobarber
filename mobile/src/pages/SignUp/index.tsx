import React, { useRef, useState } from 'react';
import { Image, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import Background from '~/components/Background';
import {
  Container,
  Form,
  FormInput,
  SubmitButtom,
  SignLink,
  SignLinkText,
} from './styles';
import logo from '~/assets/logo.png';
import { SignStackParamList } from '~/types';
import { signUpRequest } from '~/store/modules/auth/actions';
import { RootState } from '~/store/modules/rootReducer';

type SignInScreenNavigationProp = StackNavigationProp<
  SignStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }
  const loading = useSelector((state: RootState) => state.auth.loading);

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu Email"
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordInputRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButtom loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButtom>
        </Form>
        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignLinkText>Já tenho uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};

export default SignUp;

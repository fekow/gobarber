import React, { useRef } from 'react';
import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from 'components/Form/input';
import * as Yup from 'yup';
import { signInRequest } from 'store/modules/auth/actions';
//pego o tipo inferido dos meus reducers
import { RootState } from 'store/modules/rootReducer';
interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    async function validation(formData: FormData) {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Email inválido')
            .required('Insira um e-mail'),
          password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('A senha é obrigatória'),
        });
        await schema.validate(formData, { abortEarly: false });
        formRef.current?.setErrors({});
        dispatch(signInRequest(formData.email, formData.password));
        reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorMessages: { [index: string]: string } = {};
          err.inner.forEach(error => {
            return (errorMessages[error.path] = error.message);
          });
          formRef.current?.setErrors(errorMessages);
        }
      }
    }
    validation(data);
  };
  return (
    <>
      <img src={logo} alt="gobarber" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button disabled={loading} type="submit">
          {loading ? <FaSpinner size={20} color={'#fff'} /> : 'Acessar'}
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
};

export default SignIn;

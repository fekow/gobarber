import React, { useRef } from 'react';
import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { signUpRequest } from 'store/modules/auth/actions';
import Input from 'components/Form/input';
import * as Yup from 'yup';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    async function validation(formData: {
      name: string;
      email: string;
      password: string;
    }) {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string()
            .email('Insira um e-mail válido.')
            .required('O email é obrigatório.'),
          password: Yup.string()
            .min(6, 'No mínimo 6 caracteres')
            .required('A senha é obrigatória'),
        });
        await schema.validate(formData, {
          abortEarly: false,
        }); // valido os dados, erro vai pro catch
        reset();
        formRef.current?.setErrors({});
        dispatch(
          signUpRequest(formData.name, formData.email, formData.password)
        );
      } catch (err) {
        console.tron.log(err);

        //verifico se é mesmo erro de validação ou outra coisa
        if (err instanceof Yup.ValidationError) {
          const errorMessages: { [index: string]: string } = {}; // SO NICE
          err.inner.forEach(error => {
            errorMessages[error.path] = String(error.message);
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
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">Acessar</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
};

export default SignUp;

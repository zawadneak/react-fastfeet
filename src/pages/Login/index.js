import React from 'react';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Container, Holder } from './styles';
import fastfeet from '~/assets/img/fastfeet.png';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

export default function Login() {
  const handleSubmit = ({ email, password }) => {};

  return (
    <Container>
      <Holder>
        <img alt="" src={fastfeet} />
        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>YOUR E-MAIL</strong>
          <Input name="email" type="email" placeholder="example@email.com" />
          <strong>YOUR PASSWORD</strong>
          <Input name="password" type="password" placeholder="*******" />
          <button type="submit">Enter the plataform</button>
        </Form>
      </Holder>
    </Container>
  );
}

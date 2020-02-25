import React from 'react';

import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import history from '~/services/history';
import { Container, Holder, RegisterBox, StreetInput } from './styles';
import EditButtons from '~/components/EditionButtons/index';
import { recipientRegisterRequest } from '~/store/modules/recipients/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name field is required!'),
  street: Yup.string().required('Street field is required!'),
  number: Yup.number()
    .typeError('This field must be a number!')
    .positive()
    .required('Street number is required!'),
  complement: Yup.string(),
  city: Yup.string().required('City field is required!'),
  state: Yup.string().required('State filed is required!'),
  postalCode: Yup.string().required('Postal Code is required!'),
});

export default function RecipientRegister() {
  const handleClose = () => {
    history.push('/recipients');
  };
  const loading = useSelector(state => state.recipients.loading);
  const dispatch = useDispatch();

  // data contains name,street,number,complement,city,state,postalCode
  const handleSubmit = data => {
    dispatch(recipientRegisterRequest(data));
  };
  return (
    <Container>
      <Holder>
        <Form onSubmit={handleSubmit} schema={schema}>
          <EditButtons
            title="Register Recipient"
            onBack={handleClose}
            loading={loading}
          />
          <RegisterBox>
            <div id="name">
              <strong>Name</strong>
              <Input type="text" name="name" placeholder="Lucas Cassilha" />
            </div>
            <div>
              <StreetInput>
                <strong>Street</strong>
                <Input
                  type="text"
                  name="street"
                  placeholder="Beethoven Street"
                />
              </StreetInput>
              <div>
                <strong>Number</strong>
                <Input
                  type="text"
                  name="number"
                  placeholder="1750"
                  defaultValue={0}
                />
              </div>
              <div>
                <strong>Complement</strong>
                <Input type="text" name="complement" />
              </div>
            </div>
            <div id="third-column">
              <div>
                <strong>City</strong>
                <Input type="text" name="city" placeholder="Curitiba" />
              </div>
              <div>
                <strong>State</strong>
                <Input type="text" name="state" placeholder="Paraná" />
              </div>
              <div>
                <strong>Postal Code</strong>
                <InputMask
                  type="text"
                  placeholder="80.000-000"
                  mask="99.999-999"
                  name="postalCode"
                >
                  {inputProps => <Input {...inputProps} defaultValue={0} />}
                </InputMask>
              </div>
            </div>
          </RegisterBox>
        </Form>
      </Holder>
    </Container>
  );
}

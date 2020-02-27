import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import history from '~/services/history';
import { Container, Holder, RegisterBox, StreetInput } from './styles';
import EditButtons from '~/components/EditionButtons/index';
import { recipientEditRequest } from '~/store/modules/recipients/actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  street: Yup.string(),
  number: Yup.number()
    .typeError('This field must be a number!')
    .positive(),
  complement: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  postalCode: Yup.string(),
});

export default function RecipientEdition({ match }) {
  const { id } = match.params;
  const recipientsLoad = useSelector(state => state.recipients.data);
  const [itemInformation, setItem] = useState({});

  useEffect(() => {
    const findItem = recipientsLoad.filter(item => {
      return item.id === Number(id);
    });

    if (!findItem[0]) {
      history.push('/recipients');
    }
    setItem(findItem[0]);
  }, [recipientsLoad]);

  const handleClose = () => {
    history.push('/recipients');
  };
  const loading = useSelector(state => state.recipients.loading);
  const dispatch = useDispatch();

  // data contains name,street,number,complement,city,state,postalCode
  const handleSubmit = data => {
    dispatch(recipientEditRequest(id, data));
  };
  return (
    <Container>
      <Holder>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          initialData={itemInformation}
        >
          <EditButtons
            title="Edit Recipient"
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
                  contentEditable
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
                <Input type="text" name="postalCode" placeholder="00.000-000" />
              </div>
            </div>
          </RegisterBox>
        </Form>
      </Holder>
    </Container>
  );
}

RecipientEdition.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

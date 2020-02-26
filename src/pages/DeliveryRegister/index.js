import React, { useEffect, useState } from 'react';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import history from '~/services/history';
import { Container, Holder, RegisterBox } from './styles';
import EditButtons from '~/components/EditionButtons/index';
import { recipientRequest } from '~/store/modules/recipients/actions';
import { providerRequest } from '~/store/modules/providers/actions';

import { deliveryRegisterRequest } from '~/store/modules/deliveries/actions';

const schema = Yup.object().shape({
  product: Yup.string().required('This field is required'),
});

export default function DeliveryRegister() {
  const loading = useSelector(state => state.deliveries.loading);
  const recipientLoad = useSelector(state => state.recipients.data);
  const providerLoad = useSelector(state => state.providers.data);

  const [recipientOptions, setRecipientOptions] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);

  const [recipient_id, setRecipient] = useState(null);
  const [provider_id, setProvider] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipientRequest(null, 1, 999));
    dispatch(providerRequest(null, 1, 999));
  }, []);
  useEffect(() => {
    const recOptions = recipientLoad.map(item => ({
      value: item.id,
      label: item.name,
    }));
    const proOptions = providerLoad.map(item => ({
      value: item.id,
      label: item.name,
    }));

    setRecipientOptions(recOptions);
    setProviderOptions(proOptions);
  }, [recipientLoad, providerLoad]);

  const handleClose = () => {
    history.push('/deliveries');
  };

  // data contains name,street,number,complement,city,state,postalCode
  const handleSubmit = ({ product }) => {
    if (recipient_id && provider_id) {
      const data = { product, recipient_id, provider_id };

      dispatch(deliveryRegisterRequest(data));
    } else {
      alert('Please select a recipient and a provider');
    }
  };

  return (
    <Container>
      <Holder>
        <Form onSubmit={handleSubmit} schema={schema}>
          <EditButtons
            title="Register Delivery"
            onBack={handleClose}
            loading={loading}
          />
          <RegisterBox>
            <div id="outer-box">
              <div>
                <strong>Recipient</strong>
                <Select
                  options={recipientOptions}
                  onChange={item => setRecipient(item.value)}
                />
              </div>
              <div>
                <strong>Provider</strong>
                <Select
                  options={providerOptions}
                  onChange={item => setProvider(item.value)}
                />
              </div>
            </div>
            <div id="product-box">
              <strong>Product Name</strong>
              <Input type="text" name="product" />
            </div>
          </RegisterBox>
        </Form>
      </Holder>
    </Container>
  );
}

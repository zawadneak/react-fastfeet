import React from 'react';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosImage } from 'react-icons/io';
import history from '~/services/history';
import { Container, Holder, RegisterBox } from './styles';
import EditButtons from '~/components/EditionButtons/index';
import { providerRegisterRequest } from '~/store/modules/providers/actions';
import { fileUploadRequest } from '~/store/modules/files/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name field is required!'),
  email: Yup.string().required('Email field is required!'),
});

export default function ProviderRegister() {
  const handleClose = () => {
    history.push('/providers');
  };
  const file = useSelector(state => state.files.data);
  const loading = useSelector(state => state.providers.loading);
  const dispatch = useDispatch();

  let upload = 'inputRef';

  // data contains name,street,number,complement,city,state,postalCode
  const handleSubmit = ({ name, email }) => {
    const fileID = file.id || null;

    dispatch(providerRegisterRequest(name, email, fileID));
  };

  const handleFileUpload = file => {
    const data = new Blob([file], { type: 'image/png' });
    dispatch(fileUploadRequest(data));
  };

  return (
    <Container>
      <Holder>
        <Form onSubmit={handleSubmit} schema={schema}>
          <EditButtons
            title="Register Provider"
            onBack={handleClose}
            loading={loading}
          />
          <RegisterBox>
            <div id="image">
              {file.url ? (
                <img src={file.url} alt="Provider" />
              ) : (
                <button
                  type="button"
                  name="file"
                  onClick={() => upload.click()}
                >
                  <input
                    type="file"
                    id="file"
                    name="file"
                    ref={ref => (upload = ref)}
                    style={{ display: 'none' }}
                    onChange={e => handleFileUpload(e.target.files[0])}
                  />

                  <IoIosImage size={100} />
                  <strong>Choose an image</strong>
                </button>
              )}
            </div>
            <div>
              <strong>Name</strong>
              <Input type="text" name="name" placeholder="John Doe" />
            </div>
            <div>
              <strong>E-mail</strong>
              <Input
                type="email"
                name="email"
                placeholder="example@email.com"
              />
            </div>
          </RegisterBox>
        </Form>
      </Holder>
    </Container>
  );
}

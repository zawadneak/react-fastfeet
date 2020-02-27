import React, { useState, useEffect, useRef } from 'react';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosImage } from 'react-icons/io';
import PropTypes from 'prop-types';
import history from '~/services/history';
import { Container, Holder, RegisterBox } from './styles';
import EditButtons from '~/components/EditionButtons/index';
import { providerEditRequest } from '~/store/modules/providers/actions';
import { fileUploadRequest } from '~/store/modules/files/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name field is required!'),
  email: Yup.string().required('Email field is required!'),
});

export default function ProviderEdition({ match }) {
  const { id } = match.params;
  const providerLoad = useSelector(state => state.providers.data);
  const loading = useSelector(state => state.providers.loading);
  const [itemInformation, setItem] = useState({});
  const file = useSelector(state => state.files.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const find = providerLoad.filter(item => {
      return item.id === Number(id);
    });

    if (!find[0]) {
      history.push('/providers');
    }
    setItem(find[0]);
  }, [providerLoad]);

  const handleClose = () => {
    history.push('/providers');
  };
  // data contains name,street,number,complement,city,state,postalCode

  const handleSubmit = ({ name, email }) => {
    const fileID = file.id || null;
    dispatch(providerEditRequest(id, name, email, fileID));
  };

  const handleFileUpload = files => {
    const data = new Blob([files], { type: 'image/png' });
    dispatch(fileUploadRequest(data));
  };

  const uploadRef = useRef();

  return (
    <Container>
      <Holder>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          initialData={itemInformation}
        >
          <EditButtons
            title="Edit Provider"
            onBack={handleClose}
            loading={loading}
          />
          <RegisterBox>
            <div id="image">
              {file.url ? (
                <img src={file.url} alt="Profile" />
              ) : (
                <div>
                  {itemInformation.avatar ? (
                    <button
                      type="button"
                      name="file"
                      onClick={() => uploadRef.click()}
                    >
                      <input
                        type="file"
                        id="file"
                        name="file"
                        ref={uploadRef}
                        style={{ display: 'none' }}
                        onChange={e => handleFileUpload(e.target.files[0])}
                      />
                      <img src={itemInformation.avatar.url} alt="Provider" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      name="file"
                      onClick={() => uploadRef.click()}
                    >
                      <input
                        type="file"
                        id="file"
                        name="file"
                        ref={uploadRef}
                        style={{ display: 'none' }}
                      />

                      <IoIosImage size={100} />
                      <strong>Choose an image</strong>
                    </button>
                  )}
                </div>
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

ProviderEdition.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

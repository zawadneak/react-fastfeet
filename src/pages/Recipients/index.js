import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import {
  IoIosAdd,
  IoIosMore,
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import {
  recipientRequest,
  recipientDeleteRequest,
} from '~/store/modules/recipients/actions';

import { Container, Holder, Table, Action, Pages } from './styles';

export default function Recipient() {
  const recipientsLoad = useSelector(state => state.recipients.data);
  const [recipients, setRecipients] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipientRequest(null, 1));
  }, []);

  useEffect(() => {
    setRecipients(recipientsLoad);
  }, [recipientsLoad]);

  const handleActions = ({ id, visible }) => {
    setRecipients(
      produce(recipients, draft => {
        draft.map(item => {
          if (item.id === id) {
            item.visible = !visible;
          } else {
            item.visible = false;
          }
        });
      })
    );
  };

  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      'Are you sure you want to delete this recipient?'
    );
    if (confirmation) {
      dispatch(recipientDeleteRequest(id));
    }
  };

  return (
    <Container>
      <Holder>
        <header>
          <h1>Managing Recipients</h1>
        </header>
        <div>
          <header>
            <input type="text" placeholder={` Search for a recipient`} />
            <button type="button">
              <IoIosAdd size={25} />
              REGISTER
            </button>
          </header>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(item => (
                <tr>
                  <td>{`#${item.id}`}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>
                    <button type="button" onClick={() => handleActions(item)}>
                      <IoIosMore size={25} />
                      <Action visible={item.visible}>
                        <div>
                          <button type="button">
                            <FaPen
                              size={14}
                              color="#4D85EE"
                              style={{ marginRight: 10 }}
                            />
                            <p>Edit</p>
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrashAlt
                              size={14}
                              color="#DE3B3B"
                              style={{ marginRight: 10 }}
                            />
                            <p>Delete</p>
                          </button>
                        </div>
                      </Action>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Pages>
          <IoIosArrowBack />
          <strong>1</strong>
          <IoIosArrowForward />
        </Pages>
      </Holder>
    </Container>
  );
}

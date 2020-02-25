import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TableHeader from '~/components/TableHeader/index';
import {
  recipientRequest,
  recipientDeleteRequest,
} from '~/store/modules/recipients/actions';
import history from '~/services/history';

import { Container, Holder, Table, Action, Pages } from './styles';

export default function Recipient() {
  const loading = useSelector(state => state.recipients.loading);
  const recipientsLoad = useSelector(state => state.recipients.data);
  const [recipients, setRecipients] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');

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

  const handlePageAdd = () => {
    if (recipients.length < 10) {
      return toast.info('There are no more pages!');
    }
    const pageSwitch = page + 1;
    setPage(page + 1);

    dispatch(recipientRequest(null, pageSwitch));
  };
  const handlePageSub = () => {
    if (page === 1) {
      return toast.info('This is already the first page!');
    }
    const pageSwitch = page - 1;
    setPage(page - 1);

    console.log(page);

    dispatch(recipientRequest(null, pageSwitch));
  };

  const handleSearch = event => {
    if (event.key === 'Enter') {
      dispatch(recipientRequest(input, 1));
    }
    setInput('');
  };

  const handleRegister = () => {
    history.push('/recipients/register');
  };

  const handleEdit = id => {
    history.push(`recipients/edit/${id}`);
  };

  return (
    <Container>
      <Holder>
        <header>
          <h1>Managing Recipients</h1>
        </header>
        <div>
          <TableHeader
            loading={loading}
            onChange={e => setInput(e.target.value)}
            onKeyDown={event => handleSearch(event)}
            onClick={handleRegister}
          />
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
                          <button
                            type="button"
                            onClick={() => handleEdit(item.id)}
                          >
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
          <IoIosArrowBack onClick={handlePageSub} />
          <strong>1</strong>
          <IoIosArrowForward onClick={handlePageAdd} />
        </Pages>
      </Holder>
    </Container>
  );
}

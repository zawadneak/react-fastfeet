import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { produce } from 'immer';
import { toast } from 'react-toastify';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import history from '~/services/history';
import {
  providerRequest,
  providerDeleteRequest,
} from '~/store/modules/providers/actions';
import TableHeader from '~/components/TableHeader/index';

import { Container, Holder, Table, Action, NameDiv, Pages } from './styles';

export default function Provider() {
  const loading = useSelector(state => state.providers.loading);
  const providerLoad = useSelector(state => state.providers.data);
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(providerRequest(null, 1));
  }, []);

  useEffect(() => {
    setProviders(providerLoad);
  }, [providerLoad]);

  const handleActions = ({ id, visible }) => {
    setProviders(
      produce(providers, draft => {
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

  const handlePageAdd = () => {
    if (providers.length < 10) {
      return toast.info('There are no more pages!');
    }
    const pageSwitch = page + 1;
    setPage(page + 1);

    dispatch(providerRequest(input, pageSwitch));
  };
  const handlePageSub = () => {
    if (page === 1) {
      return toast.info('This is already the first page!');
    }
    const pageSwitch = page - 1;
    setPage(page - 1);

    console.log(page);

    dispatch(providerRequest(input, pageSwitch));
  };

  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      'Are you sure you want to delete this provider?'
    );

    if (confirmation) {
      dispatch(providerDeleteRequest(id));
    }
  };

  const handleSearch = e => {
    if (e.key === 'Enter') {
      dispatch(providerRequest(input, 1));
    }
    setInput('');
  };

  const handleRegister = () => {
    history.push('/providers/register');
  };
  const handleEdition = id => {
    history.push(`providers/edit/${id}`);
  };

  return (
    <Container>
      <Holder>
        <header>
          <h1>Managing Providers</h1>
        </header>
        <div>
          <TableHeader
            loading={loading}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => handleSearch(e)}
            onClick={handleRegister}
          />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(item => (
                <tr>
                  <td>{`#${item.id}`}</td>
                  <NameDiv>
                    {item.avatar ? (
                      <img src={item.avatar.url} alt="Avatar" />
                    ) : (
                      <div>{item.nullImageString}</div>
                    )}
                  </NameDiv>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button type="button" onClick={() => handleActions(item)}>
                      <IoIosMore size={25} />
                      <Action visible={item.visible}>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleEdition(item.id)}
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
          <strong>{page}</strong>
          <IoIosArrowForward onClick={handlePageAdd} />
        </Pages>
      </Holder>
    </Container>
  );
}

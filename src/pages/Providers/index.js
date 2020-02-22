import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { produce } from 'immer';
import { toast } from 'react-toastify';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashAlt, FaPen, FaPlus } from 'react-icons/fa';
import {
  providerRequest,
  providerDeleteRequest,
} from '~/store/modules/providers/actions';

import { Container, Holder, Table, Action, NameDiv, Pages } from './styles';

export default function Provider() {
  const providerLoad = useSelector(state => state.providers.providers);
  const [providers, setProviders] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(providerRequest(null, 1));
  }, []);

  useEffect(() => {
    setProviders(providerLoad);
  }, [providerLoad]);

  const reloadAPI = (query, page) => {
    if (providers.length < 10) {
      return toast('There are no more pages!');
    }
    dispatch(providerRequest(query || null, page || 1));
  };

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

  const handleDelete = id => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      'Are you sure you want to delete this provider?'
    );

    if (confirmation) {
      dispatch(providerDeleteRequest(id));
    }
  };

  return (
    <Container>
      <Holder>
        <header>
          <h1>Managing Providers</h1>
        </header>
        <div>
          <header>
            <input type="text" placeholder={` Search for a delivery`} />
            <button type="button">
              <FaPlus size={15} style={{ marginRight: 10 }} />
              REGISTER
            </button>
          </header>
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

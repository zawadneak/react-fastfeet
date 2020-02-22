import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import {
  IoIosAdd,
  IoIosMore,
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io';
import { FaEye, FaTrashAlt, FaPen } from 'react-icons/fa';
import {
  deliveryRequest,
  deliveryDeleteRequest,
} from '~/store/modules/deliveries/actions';

import {
  Container,
  Holder,
  Status,
  Table,
  Action,
  NameDiv,
  Pages,
} from './styles';

export default function Deliveries() {
  const deliveriesLoad = useSelector(state => state.deliveries.data);
  const [deliveries, setDeliveries] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deliveryRequest(null, 1));
  }, []);

  useEffect(() => {
    setDeliveries(deliveriesLoad);
  }, [deliveriesLoad]);

  const handleActions = ({ id, visible }) => {
    setDeliveries(
      produce(deliveries, draft => {
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
      'Are you sure you want to delete this delivery?'
    );

    if (confirmation) {
      dispatch(deliveryDeleteRequest(id));
    }
  };

  return (
    <Container>
      <Holder>
        <header>
          <h1>Managing Deliveries</h1>
        </header>
        <div>
          <header>
            <input type="text" placeholder={` Search for a delivery`} />
            <button type="button">
              <IoIosAdd size={25} />
              REGISTER
            </button>
          </header>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient</th>
                <th>Provider</th>
                <th>City</th>
                <th>State</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(item => (
                <tr>
                  <td>{`#${item.id}`}</td>
                  <td>{item.destination.name}</td>
                  <NameDiv>
                    {item.avatar ? (
                      <img src={item.provider.avatar.url} />
                    ) : (
                      <div>{item.nullImageString}</div>
                    )}
                    {item.provider ? item.provider.name : 'NONE'}
                  </NameDiv>
                  <td>{item.destination.city}</td>
                  <td>{item.destination.state}</td>
                  <Status statusColor={item.statusColor}>
                    <strong>
                      <div />
                      {item.status}
                    </strong>
                  </Status>
                  <td>
                    <button type="button" onClick={() => handleActions(item)}>
                      <IoIosMore size={25} />
                      <Action visible={item.visible}>
                        <div>
                          <button type="button">
                            <FaEye
                              size={14}
                              color="#8E5BE8"
                              style={{ marginRight: 10 }}
                            />
                            <p>See</p>
                          </button>
                        </div>
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

/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaEye, FaTrashAlt, FaPen } from 'react-icons/fa';

import {
  Container,
  Holder,
  Status,
  Table,
  Action,
  NameDiv,
  Pages,
} from './styles';
import TableHeader from '~/components/TableHeader/index';
import DeliveryInfo from '~/components/DeliveryInfo/index';
import {
  deliveryRequest,
  deliveryDeleteRequest,
} from '~/store/modules/deliveries/actions';

export default function Deliveries() {
  const loading = useSelector(state => state.deliveries.loading);
  const deliveriesLoad = useSelector(state => state.deliveries.data);
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [informationModal, setInformationVisible] = useState(false);
  const [deliveryModalInfo, setModalInfo] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deliveryRequest(input, 1));
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
    const confirmation = confirm('Are you sure you want to delete this?');
    if (confirmation) {
      dispatch(deliveryDeleteRequest(id));
      dispatch(deliveryRequest(input, 1));
    }
  };

  const handlePageAdd = () => {
    if (deliveries.length < 10) {
      return toast.info('There are no more pages!');
    }
    const pageSwitch = page + 1;
    setPage(page + 1);

    dispatch(deliveryRequest(input, pageSwitch));
  };
  const handlePageSub = () => {
    if (page === 1) {
      return toast.info('This is already the first page!');
    }
    const pageSwitch = page - 1;
    setPage(page - 1);

    console.log(page);

    dispatch(deliveryRequest(input, pageSwitch));
  };

  const handleSearch = event => {
    if (event.key === 'Enter') {
      dispatch(deliveryRequest(input, 1));
    }
    setInput('');
  };

  return (
    <Container>
      <DeliveryInfo
        open={informationModal}
        onClose={() => setInformationVisible(false)}
        item={deliveryModalInfo}
      />
      <Holder>
        <header>
          <h1>Managing Deliveries</h1>
        </header>
        <div>
          <TableHeader
            loading={loading}
            onChange={e => setInput(e.target.value)}
            onKeyDown={event => handleSearch(event)}
          />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
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
                <>
                  <tr>
                    <td>{`#${item.id}`}</td>
                    <td>{item.product}</td>
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
                            <button
                              type="button"
                              onClick={() => {
                                setModalInfo(item);
                                setInformationVisible(true);
                              }}
                            >
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
                              onClick={() => {
                                handleDelete(item.id);
                              }}
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
                </>
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

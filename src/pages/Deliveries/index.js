import React, { useState } from 'react';

import { produce } from 'immer';
import { IoIosAdd, IoIosMore } from 'react-icons/io';
import { FaEye, FaTrashAlt, FaPen } from 'react-icons/fa';

import { Container, Holder, Status, Table, Action, NameDiv } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      recipient: {
        name: 'Luquinhas',
      },
      provider: {
        name: 'Lucao',
      },
      city: 'Curitiba',
      state: 'Paraná',
      visible: false,
    },
    {
      id: 2,
      recipient: {
        name: 'AMLASNSA',
      },
      provider: {
        name: 'Lucao',
      },
      city: 'Curitiba',
      state: 'Paran[á',
      visible: false,
    },
  ]);

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
                  <NameDiv>
                    <div>L</div>
                    {item.recipient.name}
                  </NameDiv>
                  <td>{item.provider.name}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <Status>
                    <strong>
                      <div />
                      DELIVERED
                    </strong>
                  </Status>
                  <td>
                    <button type="button" onClick={() => handleActions(item)}>
                      <IoIosMore size={25} />
                      <Action visible={item.visible}>
                        <div>
                          <FaEye
                            size={14}
                            color="#8E5BE8"
                            style={{ marginRight: 10 }}
                          />
                          <p>See</p>
                        </div>
                        <div>
                          <FaPen
                            size={14}
                            color="#4D85EE"
                            style={{ marginRight: 10 }}
                          />
                          <p>Edit</p>
                        </div>
                        <div>
                          <FaTrashAlt
                            size={14}
                            color="#DE3B3B"
                            style={{ marginRight: 10 }}
                          />
                          <p>Delete</p>
                        </div>
                      </Action>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Holder>
    </Container>
  );
}

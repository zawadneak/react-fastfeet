import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

import { problemRequest } from '~/store/modules/problems/actions';

import { Container, Holder, Table, Action, Pages } from './styles';

export default function Problems() {
  const problemsLoad = useSelector(state => state.problems.data);
  const [problems, setProblems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(problemRequest(null, 1));
  }, []);

  useEffect(() => {
    setProblems(problemsLoad);
  }, [problemsLoad]);
  const handleActions = ({ id, visible }) => {
    setProblems(
      produce(problems, draft => {
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
          <h1>Managing Problems</h1>
        </header>
        <div>
          <header>
            <input type="text" placeholder={` Search for a delivery`} />
          </header>
          <Table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Problem</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(item => (
                <tr>
                  <td>
                    {item.delivery_id
                      ? `#${item.delivery_id}`
                      : 'Delivery Deleted'}
                  </td>
                  <td>{item.description}</td>
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
                          <FaTrashAlt
                            size={14}
                            color="#DE3B3B"
                            style={{ marginRight: 10 }}
                          />
                          <p>Cancel</p>
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

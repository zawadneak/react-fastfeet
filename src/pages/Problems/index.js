/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';

import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosMore, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LinesEllipsis from 'react-lines-ellipsis';

import ProblemInfo from '~/components/ProblemInfo/index';

import {
  problemRequest,
  problemCancelRequest,
} from '~/store/modules/problems/actions';

import { Container, Holder, Table, Action, Pages } from './styles';

export default function Problems() {
  const problemsLoad = useSelector(state => state.problems.data);
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState('');
  const [problemVisible, setVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(problemRequest(1));
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

  const handlePageAdd = () => {
    if (problems.length < 10) {
      return toast.info('There are no more pages!');
    }
    const pageSwitch = page + 1;
    setPage(page + 1);

    dispatch(problemRequest(pageSwitch));
  };
  const handlePageSub = () => {
    if (page === 1) {
      return toast.info('This is already the first page!');
    }
    const pageSwitch = page - 1;
    setPage(page - 1);

    console.log(page);

    dispatch(problemRequest(pageSwitch));
  };

  const handleCancelDelivery = id => {
    const confirmation = confirm(
      'Are you sure you want to delete this delivery?'
    );
    if (confirmation) {
      dispatch(problemCancelRequest(id));
    }
  };

  const handleProblem = description => {
    setDescription(description);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setDescription('');
  };
  return (
    <Container>
      <ProblemInfo
        description={description}
        open={problemVisible}
        onClose={handleClose}
      />
      <Holder>
        <header>
          <h1>Managing Problems</h1>
        </header>
        <div>
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
                  <td>
                    <LinesEllipsis
                      text={item.description}
                      maxLine="1"
                      ellipsis="..."
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleActions(item)}>
                      <IoIosMore size={25} />
                      <Action visible={item.visible}>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleProblem(item.description)}
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
                          <button
                            type="button"
                            onClick={() => handleCancelDelivery(item.id)}
                          >
                            <FaTrashAlt
                              size={14}
                              color="#DE3B3B"
                              style={{ marginRight: 10 }}
                            />
                            <p>Cancel</p>
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

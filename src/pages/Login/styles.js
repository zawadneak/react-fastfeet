/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #7d40e7;
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #fff;
  height: 400px;
  width: 350px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

  img {
    height: 45px;
    width: 250px;
    margin-bottom: 40px;
  }
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  strong {
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }

  input {
    background: #fff;
    height: 45px;
    padding: 0 15px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
  }

  button {
    background: #7d40e7;
    height: 45px;
    font-size: 16px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    transition: 0.5s;

    &:hover {
      background: ${darken(0.07, '#7D40E7')};
    }
  }

  span {
    font-family: 'Roboto', sans-serif;
    margin: 0px 0px 10px;
    text-align: center;
    font-size: 13px;
    color: #ed544a;
  }
`;

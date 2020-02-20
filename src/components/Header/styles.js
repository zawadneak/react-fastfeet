import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 65px;
  width: 100%;
  position: fixed;
  top: 0;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin: 0 10px;
      align-self: center;
      padding: 0 10px;
      border-right: 1px solid #ddd;
    }
  }
`;

export const Navigator = styled(Link)`
  margin: 10px;
  background: none;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  color: #000;
  font-family: 'Roboto', sans-serif;
  opacity: ${props => (props.path ? 1 : 0.5)};
  transition: 1s;

  &:hover {
    opacity: ${props => (props.path ? 1 : 0.65)};
  }
`;

export const Holder = styled.div`
  display: flex;
  margin-left: 20px;
  padding: 0 15px;
  div {
    text-align: right;
    margin-right: 10px;
    flex-direction: column;

    strong {
      font-family: 'Roboto', sans-serif;
      display: block;
      font-weight: 400;
      font-size: 14px;
    }
    a {
      font-family: 'Roboto', sans-serif;
      font-size: 13px;
      text-align: right;
      display: block;
      color: #de3b3b;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

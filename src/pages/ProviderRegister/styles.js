import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding-top: 65px;
  font-family: 'Roboto', sans-serif;
`;

export const Holder = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1600px;
  height: 350px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media screen and (max-width: 980px) {
    padding: 10px;
    width: 100%;
  }
`;

export const RegisterBox = styled.div`
  width: 100%;
  background: #fff;
  height: 400px;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
  }

  #image {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 0;
      color: #ddd;
      background: #fff;
      transition: 0.3s;
      :hover {
        color: ${darken(0.15, '#ddd')};
      }
    }

    img {
      height: 200px;
      border-radius: 50%;
    }
  }

  input {
    height: 45px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 15px;
  }

  span {
    color: #de3b3b;
    font-size: 13px;
    margin-top: 3px;
  }
`;

import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
  }
  div {
    display: flex;
  }

  button {
    height: 36px;
    width: 120px;
    margin-right: 10px;
    border: 0px;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #fff;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    transition: 0.3s;
    strong {
      margin-left: 5px;
    }

    :hover {
      background-color: ${darken(0.05, '#ccc')};
    }
  }

  .save {
    background-color: #7d40e7;

    :hover {
      background-color: ${darken(0.15, '#7d40e7')};
    }
  }

  #loading {
    animation: ${rotation} 1s ease-in-out 0s infinite;
  }
`;

export default Wrapper;

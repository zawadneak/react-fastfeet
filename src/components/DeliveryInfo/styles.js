import styled from 'styled-components';

export const Holder = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  width: 400px;
  :last-child {
    border: 0;
  }

  div {
    border-bottom: 1px solid #ddd;
    margin: 10px 0px;
    strong {
      margin: 5px 0;
    }

    p {
      margin: 5px 0;
    }
  }

  div > div {
    border: none;
    margin-top: 5px;
    display: flex;

    p {
      margin-left: 5px;
    }
  }

  #signature {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    margin: 10px auto;
    height: auto;
    width: 300px;
  }
`;

export const a = 1;

import styled from 'styled-components';

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
  height: auto;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  #outer-box {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    > div {
      flex: 1;
      :first-child {
        margin-right: 10px;
      }
    }
    strong {
      margin-bottom: 10px;
    }
  }

  #product-box {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      font-size: 16px;
    }

    span {
      color: #de3b3b;
      font-size: 13px;
      margin-top: 3px;
    }
  }
`;

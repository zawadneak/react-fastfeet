import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding-top: 65px;
`;

export const Holder = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1600px;
  height: 200px;
  align-items: center;
  padding: 20px;

  @media screen and (max-width: 980px) {
    padding: 10px;
    width: 100%;
  }

  header {
    h1 {
      font-size: 24px;
      margin: 20px 0px;
      font-family: 'Roboto', sans-serif;
    }
  }
`;

export const Table = styled.table`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0px 15px;

  thead {
    tr {
      &::first-child {
        border-top-left-radius: 100px;
      }
      th {
        padding: 0 20px;
      }
    }
  }

  tbody {
    tr {
      margin: 10px;
      border-spacing: 10px;
      background: #fff;
      table-layout: none;
      height: 50px;

      td {
        padding: 0 20px;
        ${css`
          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            text-align: right;
            position: relative;
          }
        `}

        button {
          background: none;
          border: 0;
          color: black;
          opacity: 0.7;
          cursor: pointer;
          z-index: 0;

          &:hover {
            opacity: 1;
          }
        }

        p {
          display: block;
        }
      }
    }
  }
`;

export const Action = styled.div`
  position: absolute;
  width: 100px;
  right: calc(50%-100px);
  top: calc(50%-30px);
  z-index: 1;
  transition: 1s;
  display: ${props => (!props.visible ? 'none' : '')};

  div {
    width: 240px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    color: #aaa;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    padding: 10px;
    font-size: 14px;
    width: 100px;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const Pages = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  color: #aaa;
  cursor: pointer;
  transition: 1s;

  :hover {
    color: black;
  }

  strong {
    padding: 0 10px;
  }
`;

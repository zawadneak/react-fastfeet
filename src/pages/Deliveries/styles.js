import styled, { css } from 'styled-components';
import { darken } from 'polished';

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

  header {
    h1 {
      font-size: 24px;
      margin: 20px 0px;
      font-family: 'Roboto', sans-serif;
    }
  }

  div {
    width: 100%;
  }

  div > header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;

    input {
      height: 35px;
      width: 200px;
      padding: 0px 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 150px;
      border: 0px;
      background: #7d40e7;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
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
      }
    }
  }
`;

export const Status = styled.td`
  strong {
    background: #dff0df;
    width: auto;
    max-width: 150px;
    height: 30px;
    padding: 0 10px;
    border-radius: 100px;
    color: #2ca42b;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 10px;
      width: 10px;
      background: #2ca42b;
      border-radius: 5px;
      margin-right: 5px;
    }
  }
`;

export const Action = styled.div`
  position: absolute;
  background: #fff;
  padding: 10px;
  width: 100%;
  right: calc(50%-120px);
  top: calc(50%-30px);
  z-index: 1;
  transition: 1s;
  width: 240px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: ${props => (!props.visible ? 'none' : '')};

  div {
    cursor: pointer;
    color: #aaa;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 5px;
    padding: 5px;
    font-size: 14px;
    & + div {
      border-top: 1px solid #ddd;
    }
  }
`;

export const NameDiv = styled.td`
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-top: 10px;
  align-items: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background: #f4effc;
    margin-right: 5px;
    color: #a28fd0;
  }
`;

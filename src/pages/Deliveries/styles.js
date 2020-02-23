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

  div {
    width: 100%;
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
    background: ${props => props.statusColor};
    width: auto;
    max-width: 150px;
    height: 30px;
    padding: 0 10px;
    border-radius: 100px;
    color: ${props => darken(0.4, props.statusColor)};
    font-weight: bold;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 10px;
      width: 10px;
      background: ${props => darken(0.4, props.statusColor)};
      border-radius: 5px;
      margin-right: 5px;
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

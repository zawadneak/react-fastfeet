import styled from 'styled-components';
import { darken } from 'polished';

const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;

  div {
    display: flex;
  }
  div > div {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    margin-right: -10px;
    padding: 0px 10px;
    border-radius: 4px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid #ddd;
    border-right: 0px #fff;
    background: #fff;
  }
  input {
    height: 35px;
    width: 200px;
    padding: 0px 10px;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border: 1px solid #ddd;
    border-left: 0px #fff;
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
`;

export default Header;

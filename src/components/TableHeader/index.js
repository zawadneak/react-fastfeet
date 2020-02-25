import React from 'react';

import { IoIosSearch } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import PropTypes from 'prop-types';
import Header from './styles';

export default function TableHeader({ onKeyDown, onChange, onClick, loading }) {
  return (
    <Header>
      <div>
        <div>
          {loading ? (
            <FaSpinner id="loading" size={20} color="#bbb" />
          ) : (
            <IoIosSearch size={20} color="#bbb" />
          )}
        </div>
        <input
          type="text"
          placeholder="Press enter to search"
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </div>
      <button type="button" onClick={onClick}>
        <GoPlus size={20} />
        <strong>REGISTER</strong>
      </button>
    </Header>
  );
}
TableHeader.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

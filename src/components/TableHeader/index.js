import React from 'react';

import { IoIosSearch } from 'react-icons/io';
import { FaPlus, FaSpinner } from 'react-icons/fa';
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
        <FaPlus size={15} style={{ marginRight: 10 }} />
        REGISTER
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

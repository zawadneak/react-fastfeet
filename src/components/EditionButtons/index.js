import React from 'react';

import { IoMdCheckmark, IoIosArrowBack } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import Wrapper from './styles';

export default function EditionButtons({ loading, onBack, onSave, title }) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <div>
        <button type="button" onClick={onBack}>
          <IoIosArrowBack size={17} />
          <strong>BACK</strong>
        </button>
        <button type="submit" className="save" onClick={onSave}>
          {loading ? <FaSpinner id="loading" /> : <IoMdCheckmark size={17} />}
          <strong>SAVE</strong>
        </button>
      </div>
    </Wrapper>
  );
}

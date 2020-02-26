import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { Holder } from './styles';

export default function DeliveryInformation({ onClose, open, description }) {
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Holder>
        <div>
          <strong>PROBLEM DESCRIPTION</strong>
          <p>{description}</p>
        </div>
      </Holder>
    </Dialog>
  );
}

DeliveryInformation.propTypes = {
  onClose: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { parseISO, format } from 'date-fns';
import { Holder } from './styles';

export default function DeliveryInformation({ onClose, open, item }) {
  const startDate = item.start_date
    ? format(parseISO(item.start_date), 'dd/MM/yy')
    : null;
  const endDate = item.end_date
    ? format(parseISO(item.end_date), 'dd/MM/yy')
    : null;

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <Holder>
        <div>
          <strong>Delivery Information</strong>
          {item.destination ? (
            <>
              <p>{`${item.destination.street} - ${item.destination.number}`}</p>
              {item.destination.complement ? (
                <p>{item.destination.complement}</p>
              ) : null}
              <p>{`${item.destination.city} - ${item.destination.state}`}</p>
              <p>81510-001</p>
            </>
          ) : null}
        </div>
        <div>
          <strong>Dates</strong>
          <div>
            <strong>Picked up: </strong>
            <p>
              {item.start_date ? startDate : "Item hasn't been picked up yet"}
            </p>
          </div>
          <div>
            <strong>Delivered: </strong>
            <p>{item.end_date ? endDate : "Item hasn't been delivered yet"}</p>
          </div>
        </div>
        {item.signature_id ? (
          <div style={{ border: 0 }}>
            <strong>Recipient Signature</strong>
            <div id="signature">
              <img src={item.signature.url} alt="signature" />
            </div>
          </div>
        ) : null}
      </Holder>
    </Dialog>
  );
}

DeliveryInformation.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
};

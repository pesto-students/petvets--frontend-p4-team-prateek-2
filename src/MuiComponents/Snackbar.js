import { Alert } from '@mui/lab';
import React from 'react';

const Snackbar = ({ open, message }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snackbar;

import { Alert } from '@mui/lab';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { sendApprovalEmail } from '../actions/doctors.actions';
import { getUserAPI } from '../actions/users.actions';
import { UserProfile } from './UserProfile';

const AdminDoctor = () => {
  const [open, setOpen] = useState(false);
  const { doctorId } = useParams();
  const { data: userData } = useQuery('getUserAPI', () => getUserAPI(doctorId));
  const sendEmailHandler = (status, userData) => {
    sendEmailQuery.mutate({
      status,
      userData,
    });
  };
  const sendEmailQuery = useMutation(sendApprovalEmail, {
    onSuccess: (data) => {
      setOpen(true);
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User is notified with an email
        </Alert>
      </Snackbar>

      <UserProfile uid={doctorId} />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => sendEmailHandler('approved', userData)}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => sendEmailHandler('rejected', userData)}
        >
          Reject
        </Button>
      </div>
    </>
  );
};

export default AdminDoctor;

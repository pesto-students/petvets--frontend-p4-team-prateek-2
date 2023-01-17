import { Button } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { sendApprovalEmail } from '../actions/doctors.actions';
import { getUserAPI } from '../actions/users.actions';
import { UserProfile } from './UserProfile';

const AdminDoctor = () => {
  const { userId } = useParams();
  const { data: userData } = useQuery('getUserAPI', () => getUserAPI(userId));
  const sendEmailHandler = (status, userData) => {
    sendEmailQuery.mutate({
      status,
      userData,
    });
  };
  const sendEmailQuery = useMutation(sendApprovalEmail, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <>
      <UserProfile />
      <Button
        variant="contained"
        color="success"
        onClick={() => sendEmailHandler('approved', userData)}
      >
        Approved
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => sendEmailHandler('rejected', userData)}
      >
        Reject
      </Button>
    </>
  );
};

export default AdminDoctor;

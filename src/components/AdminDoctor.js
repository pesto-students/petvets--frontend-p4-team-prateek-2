import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserAPI } from '../actions/users.actions';

const AdminDoctor = () => {
  const { userId } = useParams();
  const { data } = useQuery('getUserAPI', () => getUserAPI(userId));
  console.log(data);
  return <div>AdminDoctor</div>;
};

export default AdminDoctor;

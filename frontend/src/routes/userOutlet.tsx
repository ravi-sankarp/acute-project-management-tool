import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAuth } from '../redux/features/reducers/authSlice';

function AdminOutlet() {
  const data = useSelector(selectUserAuth);
  if (data.token) {
    return <Outlet />;
  }
  return <Navigate to="//login" />;
}

export default AdminOutlet;

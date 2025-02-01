import { useAuth } from '../contexts/AuthContext';

const DashBoard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default DashBoard;
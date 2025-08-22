import { useState } from 'react';
import './UserButton.css';
import Image from '../Image/Image';
import apiRequest from '../../utils/apiRequest';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../../utils/authStore';

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const { currentUser, removeCurrentUser } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/users/auth/logout', {});
      removeCurrentUser();
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  };
  return currentUser ? (
    <div className="userButton">
      <Image path={currentUser.img || '/general/noAvatar.png'} alt="" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/profile/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Setting</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Signup
    </Link>
  );
};

export default UserButton;

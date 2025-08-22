import './AuthPage.css';
import Image from '../../components/Image/Image';
import { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router';
import useAuthStore from '../../utils/authStore';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { setCurrentUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post(`/users/auth/${isRegister ? 'register' : 'login'}`, data);

      setCurrentUser(res.data);

      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" w={36} h={36} />
        <h1>{isRegister ? 'Create an Account' : 'Login to your account'}</h1>
        {isRegister ? (
          <form key={'register'} onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                placeholder="Username"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="displayName"
                placeholder="Name"
                id="displayName"
                name="displayName"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" id="email" name="email" required />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Register</button>
            <p
              onClick={() => {
                setIsRegister(false);
              }}
            >
              Do you have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key={'loginForm'} onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" id="email" name="email" required />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Login</button>
            <p
              onClick={() => {
                setIsRegister(true);
              }}
            >
              Don&apos;t have account? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

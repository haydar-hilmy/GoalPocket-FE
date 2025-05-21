import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const RedirectIfLoggedIn = ({ children }) => { // if user loggedIn, then automatically redirect to "/" (dashboard)
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default RedirectIfLoggedIn;
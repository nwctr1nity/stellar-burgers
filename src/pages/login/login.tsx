import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import {
  getAuthLoading,
  getAuthError,
  getAuthUser
} from '../../utils/constants';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../slices/auth-slice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(getAuthUser);
  const isLoading = useSelector(getAuthLoading);
  const isError = useSelector(getAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={isError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

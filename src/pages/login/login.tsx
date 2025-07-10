import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { getAuthLoading, getAuthError } from '../../utils/constants';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../slices/auth-slice';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getAuthLoading);
  const isError = useSelector(getAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };

    dispatch(loginUser(userData));
  };

  return isLoading ? (
    <Preloader />
  ) : (
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

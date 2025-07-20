import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../slices/auth-slice';
import { getAuthError, getAuthLoading } from '../../utils/constants';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useSelector(getAuthError);
  const isLoading = useSelector(getAuthLoading);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData = {
      email,
      name: userName,
      password
    };
    dispatch(registerUser(registerData));
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={isError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

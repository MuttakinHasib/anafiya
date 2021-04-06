import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActivation } from '../redux/actions/userActions';

const UserActivationScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.userActivation);

  const token = match.params.token;

  useEffect(() => {
    dispatch(userActivation({ token }));
    history.push('/');
  }, [dispatch, token, history]);

  error && toast.error(error);

  return <div></div>;
};

export default UserActivationScreen;

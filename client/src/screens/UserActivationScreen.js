import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Loader from '../components/Loader';
import { userActivation } from '../redux/actions/userActions';

const UserActivationScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.userActivation);

  const token = params.token;

  useEffect(() => {
    dispatch(userActivation({ token }));
    navigate('/');
  }, [dispatch, token, navigate]);

  error && toast.error(error);

  return <>{loading && <Loader />}</>;
};

export default UserActivationScreen;

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.dismiss();
    toast.error('잘못된 접근입니다.');
    navigate('/');
  }, [navigate]);

  return <div>Error</div>;
};

export default Error;

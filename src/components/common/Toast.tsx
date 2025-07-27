import React from 'react';
import { CheckIcon, ErrorIcon } from '@/assets';
import { Toaster } from 'react-hot-toast';

const Toast: React.FC = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
        success: {
          icon: <CheckIcon width={24} height={24} style={{ color: '#FFFFFF' }} />,
          style: {
            background: '#2E364D',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: '500',
          },
        },
        error: {
          icon: <ErrorIcon width={24} height={24} style={{ color: '#FFFFFF' }} />,
          style: {
            background: '#2E364D',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: '500',
          },
        },
      }}
      containerStyle={{
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  );
};

export default Toast;

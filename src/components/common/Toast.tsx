import React from 'react';
import { ErrorIcon } from '@/assets';
import { Toaster } from 'react-hot-toast';

const Toast: React.FC = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
        success: {
          style: {
            background: '#2E364D',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all', // 단어 단위로 줄바꿈 방지
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
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all', // 단어 단위로 줄바꿈 방지
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

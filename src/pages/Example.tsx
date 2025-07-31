import Lottie from 'lottie-react';
import logoAnimation from '@/assets/logoAnimation.json';

const Example = () => {
  return (
    <Lottie
      animationData={logoAnimation}
      loop
      autoplay
      style={{
        width: '300px',
        height: '300px',
      }}
    />
  );
};

export default Example;

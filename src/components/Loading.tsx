import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/images/loading.json';

interface LoadingProps {
  size: number | string;
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div style={{ height: size, width: size }}>
      <Lottie animationData={loadingAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Loading;

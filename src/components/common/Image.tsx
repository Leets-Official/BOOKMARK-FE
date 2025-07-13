import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  onClick?: () => void;
  className: string;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({ src, alt = 'image', onClick, className, onError }) => {
  return <img src={src} alt={alt} onClick={onClick} className={className} onError={onError} />;
};

export default Image;

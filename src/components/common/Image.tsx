import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  onClick?: () => void;
  className: string;
}

const Image: React.FC<ImageProps> = ({ src, alt = 'image', onClick, className }) => {
  return <img src={src} alt={alt} onClick={onClick} className={className} />;
};

export default Image;

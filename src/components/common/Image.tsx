import React, { useState } from 'react';
import clsx from 'clsx';

interface ImageProps {
  src: string;
  alt?: string;
  onClick?: () => void;
  className: string;
  onError?: () => void;
}

const Image: React.FC<ImageProps> = ({ src, alt = 'image', onClick, className, onError }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onLoad={() => setLoaded(true)}
      className={clsx(
        className,
        'transition-opacity duration-700 ease-in-out',
        loaded ? 'opacity-100' : 'opacity-0',
      )}
      onError={onError}
      loading='lazy'
    />
  );
};

export default Image;

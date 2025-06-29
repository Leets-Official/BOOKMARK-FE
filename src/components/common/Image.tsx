import React from "react";

interface ImageProps{
  src: string;
  alt?: string;             
  width?: string;           
  height?: string;           
  rounded?: string;          
  onClick?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "image",
  width = "w-32",
  height = "h-32",
  rounded = "rounded-lg",
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`
        ${width}
        ${height}
        object-cover
        ${rounded}
        ${onClick ? "cursor-pointer" : ""}
      `}
    />
  );
};

export default Image;

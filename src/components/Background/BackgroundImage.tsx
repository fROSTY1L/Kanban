import React from 'react';
import { BackgroundContainer } from '../../styles/Background/BackgroundImage.style';

interface BackgroundImageProps {
  src: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ src }) => {
  return <BackgroundContainer src={src} />;
};

export default BackgroundImage;

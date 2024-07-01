import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import useDimensions from '../../hooks/useDimensions';
import AnimatedBox from '../../assets/animations/socialPageAnimation';

const InstagramTopPostEmbed = () => {
  const { calculateInstagramWidth, calculateInstagramHeight } = useDimensions();
  const url = "https://www.instagram.com/p/C7Bxq3-rcK7/?hl=en";

  return (
    <AnimatedBox>
      <InstagramEmbed url={url} height={calculateInstagramHeight()} width={calculateInstagramWidth()} />
    </AnimatedBox>
  );
};

export default InstagramTopPostEmbed;

import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import useDimensions from '../../hooks/useDimensions';
import AnimatedBox from '../../assets/animations/socialPageAnimation';

const InstagramReelEmbed = () => {
  const { calculateInstagramReelWidth, calculateInstagramReelHeight } = useDimensions();
  const url = "https://www.instagram.com/p/C7ErB7-SmV-/?hl=en";

  return (
    <AnimatedBox>
      <InstagramEmbed url={url} height={calculateInstagramReelHeight()} width={calculateInstagramReelWidth()} />
    </AnimatedBox>
  );
};

export default InstagramReelEmbed;

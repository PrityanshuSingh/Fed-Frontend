import React from 'react';
import { LinkedInEmbed } from 'react-social-media-embed';
import useDimensions from '../../hooks/useDimensions';
import AnimatedBox from '../../assets/animations/socialPageAnimation';

const LinkedInEmbedComponent = () => {
  const { calculateLinkedInWidth, calculateLinkedInHeight } = useDimensions();
  const url = "https://www.linkedin.com/embed/feed/update/urn:li:share:7196928173924655106";
  const postUrl = "https://www.linkedin.com/posts/fedkiit_kiituniversity-fed-productdesign-activity-7196928174897700864-flSC?utm_source=share&utm_medium=member_desktop";

  return (
    <AnimatedBox>
      <LinkedInEmbed
        url={url}
        postUrl={postUrl}
        width={calculateLinkedInWidth()}
        height={calculateLinkedInHeight()}
      />
    </AnimatedBox>
  );
};

export default LinkedInEmbedComponent;

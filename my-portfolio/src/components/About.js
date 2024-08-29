import React, { useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const AboutContainer = styled.section`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  ${({ inView }) => inView && `
    opacity: 1;
    transform: translateY(0);
  `}
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

const AboutText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const About = () => {
  const ref = useRef();
  const [inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <AboutContainer ref={ref} inView={inView}>
      <AboutContent>
        <AboutTitle>About Me</AboutTitle>
        <AboutText>
          I'm a passionate developer with a keen eye for design...
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;

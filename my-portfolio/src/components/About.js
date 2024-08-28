// src/components/About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1e1e1e; /* Darker background */
  color: white;
  padding: 50px 20px;
`;

const AboutContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #bb86fc;
`;

const AboutText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: #e0e0e0;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutTitle>About Me</AboutTitle>
        <AboutText>
          I am a passionate software developer with a love for creating dynamic and intuitive applications. With experience in full-stack development, I bring ideas to life with code.
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;

// src/components/Hero.js
import React from 'react';
import styled from 'styled-components';
//import headshot from '../assets/headshot.jpg'; // Make sure to have your headshot image in the correct path

const HeroContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1f1f1f, #232323);
  color: white;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bb86fc;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  color: #e0e0e0;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeadshotImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #bb86fc; /* Adds a nice accent color border */
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeadshotImage  alt="Ethan Langley" />
        <HeroTitle>Ethan Langley</HeroTitle>
        <HeroSubtitle>Junior Software Developer</HeroSubtitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

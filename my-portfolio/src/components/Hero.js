import React from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { ReactTyped } from 'react-typed';



const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
  background: ${({ theme }) => theme.colors.background};
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Name = styled.h2`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 4rem;
  margin: 0;
`;

const Tagline = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  margin-top: 20px;
`;

const HeadshotContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Headshot = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <ParticlesWrapper>
        <Particles
          options={{
            particles: {
              number: { value: 50 },
              color: { value: '#ffffff' },
              line_linked: { color: '#ffffff' },
            },
          }}
        />
      </ParticlesWrapper>
      <HeroContent>
        <Name>Ethan Langley</Name>
        <Tagline>
          <ReactTyped
            strings={[
              "I am a Developer.",
              "I am a Designer.",
              "I am Ethan Langley."
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </Tagline>
      </HeroContent>
      <HeadshotContainer>
        <Headshot src="../img/Hero_pic.jpg" alt="Ethan Langley Headshot" />
      </HeadshotContainer>
    </HeroContainer>
  );
};

export default Hero;

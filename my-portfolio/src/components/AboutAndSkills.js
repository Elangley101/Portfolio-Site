// src/components/AboutAndSkills.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 100px 20px;
  background: #1e1e1e; /* Darker background */
  color: white;
`;

const AboutContainer = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const SkillsSummaryContainer = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #bb86fc; /* Highlight color */
`;

const Text = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: #e0e0e0;
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SkillItem = styled.li`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 10px;
  &:before {
    content: '•';
    color: #bb86fc;
    margin-right: 8px;
  }
`;

const AboutAndSkills = () => {
  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Backend Development',
    'Database Administration',
  ];

  return (
    <Container>
      <AboutContainer>
        <Title>About Me</Title>
        <Text>
          I am a passionate software developer with a love for creating dynamic and intuitive
          applications. With experience in full-stack development, I bring ideas to life with code.
        </Text>
        <Text>
          My background in database management and backend development allows me to build robust
          and scalable solutions. I am always eager to learn new technologies and take on
          challenging projects.
        </Text>
      </AboutContainer>
      <SkillsSummaryContainer>
        <Title>Top Skills</Title>
        <SkillsList>
          {skills.map((skill, index) => (
            <SkillItem key={index}>{skill}</SkillItem>
          ))}
        </SkillsList>
      </SkillsSummaryContainer>
    </Container>
  );
};

export default AboutAndSkills;

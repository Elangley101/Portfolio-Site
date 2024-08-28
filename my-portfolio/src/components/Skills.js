// src/components/Skills.js
import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.div`
  padding: 100px 20px;
  background: #121212; /* Dark background */
  color: white;
`;

const SkillsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SkillsTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #bb86fc; /* Highlight color */
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const SkillCard = styled.div`
  background: #1f1f1f; /* Dark card background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 15px rgba(187, 134, 252, 0.5);
  }
`;

const SkillName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff; /* White to make it stand out */
  font-weight: 700; /* Make the font bold */
  font-family: 'Montserrat', sans-serif; /* Modern font for a sleek look */
`;

const SkillLevel = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0; /* Even lighter gray for subtle contrast */
`;

const Skills = () => {
  const skillList = [
    { name: 'Database Analysis', level: 'Advanced' },
    { name: 'Query Languages', level: 'Advanced' },
    { name: 'Software Development', level: 'Advanced' },
    { name: 'App Development', level: 'Advanced' },
    { name: 'Backend Development', level: 'Advanced' },
    { name: 'Database Administration', level: 'Advanced' },
    { name: 'Project Management', level: 'Intermediate' },
    { name: 'Analytical Thinking', level: 'Advanced' },
    { name: 'Reasoning', level: 'Advanced' },
    { name: 'Time Management', level: 'Advanced' },
    { name: 'Detail Orientation', level: 'Advanced' },
    { name: 'Data Protection', level: 'Intermediate' },
    { name: 'Agile Methodologies', level: 'Advanced' },
    { name: 'AWS RDS', level: 'Intermediate' },
    { name: 'Web Applications', level: 'Advanced' },
    { name: 'HTML', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Full Stack Development', level: 'Advanced' },
    { name: 'MySQL', level: 'Advanced' },
    { name: '.Net', level: 'Intermediate' },
  ];

  return (
    <SkillsContainer>
      <SkillsContent>
        <SkillsTitle>My Skills</SkillsTitle>
        <SkillsGrid>
          {skillList.map((skill, index) => (
            <SkillCard key={index}>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>{skill.level}</SkillLevel>
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills;

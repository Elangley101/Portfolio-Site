import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.secondaryBackground};
`;

const SkillsTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const SkillsList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const SkillItem = styled.li`
  background: ${({ theme }) => theme.colors.skillBackground};
  color: ${({ theme }) => theme.colors.skillText};
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  font-size: 1rem;
`;

const Skills = () => {
  const skills = [
    'Database Analysis',
    'Query Languages',
    'Software Development',
    'App Development',
    'Backend Development',
    'Database Administration',
    'Project Management',
    'Analytical Thinking',
    'Reasoning',
    'Time Management',
    'Detail Orientation',
    'Data Protection',
    'Agile Methodologies',
    'AWS RDS',
    'Web Applications',
    'HTML',
    'React',
    'Full Stack',
    'MySQL',
    '.Net',
  ];

  return (
    <SkillsContainer>
      <SkillsTitle>Skills</SkillsTitle>
      <SkillsList>
        {skills.map((skill, index) => (
          <SkillItem key={index}>{skill}</SkillItem>
        ))}
      </SkillsList>
    </SkillsContainer>
  );
};

export default Skills;

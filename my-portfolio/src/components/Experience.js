// src/components/Experience.js
import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  padding: 100px 20px;
  background: #121212; /* Dark background */
  color: white;
`;

const ExperienceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ExperienceTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #bb86fc;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ExperienceCard = styled.div`
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

const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const CompanyName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #bb86fc;
`;

const JobDescription = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
`;

const Experience = () => {
  const experienceList = [
    {
      title: 'Junior Developer',
      company: 'TechCorp',
      description: 'Developed new features for the company’s web platform.',
    },
    {
      title: 'Intern',
      company: 'WebStart',
      description: 'Assisted in frontend development and UI design.',
    },
    // Add more experience as needed
  ];

  return (
    <ExperienceContainer>
      <ExperienceContent>
        <ExperienceTitle>My Experience</ExperienceTitle>
        <ExperienceGrid>
          {experienceList.map((experience, index) => (
            <ExperienceCard key={index}>
              <JobTitle>{experience.title}</JobTitle>
              <CompanyName>{experience.company}</CompanyName>
              <JobDescription>{experience.description}</JobDescription>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </ExperienceContent>
    </ExperienceContainer>
  );
};

export default Experience;

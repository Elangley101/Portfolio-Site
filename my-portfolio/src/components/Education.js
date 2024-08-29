import React from 'react';
import styled from 'styled-components';
import CustomList from './CustomList';

const EducationContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.secondaryBackground};
`;

const EducationTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const EducationItem = styled.div`
  margin-bottom: 40px;
`;

const Degree = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.subheading};
`;

const Institution = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Duration = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Science in Computer Information Technology',
      institution: "Marshall University, Huntington, WV",
      duration: "August 2018 - May 2023",
      courses: [
        "Database Design",
        "Database Optimization",
        "Web Development",
        "Application Development",
        "PostgreSQL Queries to pull from database",
        "C# applications",
        "ReactJS to create an interactive pipeline map for the public",
        "Dummy E-commerce site utilizing PHP and MySQL",
        "Microsoft Office: Excel, Outlook, PowerPoint, Access, Word, SharePoint",
        "Communications: Slack, Google Chat, Microsoft Teams",
        "Social Media: Facebook, Instagram, Twitter, LinkedIn, TikTok",
      ],
    },
  ];

  return (
    <EducationContainer>
      <EducationTitle>Education</EducationTitle>
      {educationData.map((edu, index) => (
        <EducationItem key={index}>
          <Degree>{edu.degree}</Degree>
          <Institution>{edu.institution}</Institution>
          <Duration>{edu.duration}</Duration>
          <CustomList items={edu.courses} />
        </EducationItem>
      ))}
    </EducationContainer>
  );
};

export default Education;
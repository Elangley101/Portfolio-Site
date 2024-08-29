import React from 'react';
import styled from 'styled-components';
import CustomList from './CustomList';

const ExperienceContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.background};
`;

const ExperienceTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const ExperienceItem = styled.div`
  margin-bottom: 40px;
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.subheading};
`;

const Company = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 5px 0;
`;

const Duration = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 5px 0;
`;

const Experience = () => {
  const experiences = [
    {
      jobTitle: 'Junior Software Engineer',
      company: "Parkers Kitchen",
      location: "Savannah, GA",
      duration: "July 2023 - Present",
      description: [
        "Oversee kitchen ticketing system, implementing real-time monitoring to ensure smooth operations and high user satisfaction.",
        "Implement AWS RDS updates, using automated deployment scripts to enhance menu responsiveness across multiple locations.",
        "Develop full-stack web applications using Django, successfully deploying 5 projects that improved internal workflows.",
        "Engage in agile development, delivering weekly MVPs, resulting in a 15% increase in team productivity.",
        "Utilize Docker tools to streamline deployment processes, reducing deployment time by 30% and boosting operational efficiency.",
        "Increased system uptime by 20% through strategic backend optimizations and proactive troubleshooting, reducing downtime significantly.",
      ],
    },
    {
      jobTitle: 'Application Developer Intern',
      company: "TC Energy",
      location: "Charleston, WV",
      duration: "May 2022 - Dec 2022",
      description: [
        "Spearhead development of cutting-edge full-stack web applications, driving operational efficiency and enhancing user experience across multiple locations.",
        "Managed IT service requests, using a ticketing system to ensure 95% of issues were resolved within 24 hours, enhancing operational efficiency.",
        "Resolved RSA token issues, implementing a secure protocol that enhanced system security and user access control by 25%.",
        "Developed web applications using ReactJS, employing modular design patterns to ensure maintainability, with one application still in use on the company website.",
        "Collaborated with team members nationwide via Microsoft Teams and in-person meetings, improving project delivery times by 20%.",
        "Assisted in deploying internal tools, using continuous integration pipelines to improve business processes and boost productivity by 15%.",
      ],
    },
  ];

  return (
    <ExperienceContainer>
      <ExperienceTitle>Employment History</ExperienceTitle>
      {experiences.map((exp, index) => (
        <ExperienceItem key={index}>
          <JobTitle>{exp.jobTitle}</JobTitle>
          <Company>{`${exp.company}, ${exp.location}`}</Company>
          <Duration>{exp.duration}</Duration>
          <CustomList items={exp.description} />
        </ExperienceItem>
      ))}
    </ExperienceContainer>
  );
};

export default Experience;

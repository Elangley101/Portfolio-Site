import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.secondaryBackground};
`;

const ProjectsTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const ProjectItem = styled.div`
  margin-bottom: 40px;
`;

const ProjectName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.subheading};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Technologies = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Projects = () => {
  const projects = [
    {
      name: 'Pipeline Mapping Application',
      description: 'Created an interactive pipeline map using ReactJS, improving public accessibility to critical data.',
      technologies: 'ReactJS, JavaScript, CSS, HTML',
    },
    {
      name: 'Dummy E-commerce Site',
      description: 'Developed a dummy e-commerce website utilizing PHP and MySQL, demonstrating full-stack development skills.',
      technologies: 'PHP, MySQL, HTML, CSS, JavaScript',
    },
    {
      name: 'C# Applications',
      description: 'Developed various C# applications for internal use, enhancing operational workflows.',
      technologies: 'C#, .NET, SQL Server',
    },
    {
      name: 'Full-Stack Web Applications with Django',
      description: 'Developed and deployed 5 full-stack web applications using Django, improving internal workflows.',
      technologies: 'Django, Python, JavaScript, HTML, CSS',
    },
    // Add more projects as needed
  ];

  return (
    <ProjectsContainer>
      <ProjectsTitle>Projects</ProjectsTitle>
      {projects.map((project, index) => (
        <ProjectItem key={index}>
          <ProjectName>{project.name}</ProjectName>
          <ProjectDescription>{project.description}</ProjectDescription>
          <Technologies><strong>Technologies:</strong> {project.technologies}</Technologies>
        </ProjectItem>
      ))}
    </ProjectsContainer>
  );
};

export default Projects;

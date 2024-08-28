// src/components/Projects.js
import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  padding: 100px 20px;
  background: #1e1e1e; /* Dark background */
  color: white;
`;

const ProjectsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ProjectsTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #bb86fc;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: #232323; /* Darker card background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 0px 15px rgba(187, 134, 252, 0.5);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const ProjectDescription = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
`;

const Projects = () => {
  const projectList = [
    { name: 'Project One', description: 'A cool project about X' },
    { name: 'Project Two', description: 'An awesome project about Y' },
    // Add more projects as needed
  ];

  return (
    <ProjectsContainer>
      <ProjectsContent>
        <ProjectsTitle>My Projects</ProjectsTitle>
        <ProjectsGrid>
          {projectList.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectTitle>{project.name}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects;

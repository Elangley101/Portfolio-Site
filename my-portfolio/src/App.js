import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Hero from './components/Hero';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';

const theme = {
  colors: {
    background: '#f5f5f5',
    secondaryBackground: '#ffffff',
    heading: '#333333',
    subheading: '#555555',
    text: '#666666',
    link: '#1e90ff',
    skillBackground: '#e0e0e0',
    skillText: '#333333',
    primary: '#1e90ff',
  },
};

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <ContactForm />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;

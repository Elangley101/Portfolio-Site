// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import AboutAndSkills from './components/AboutAndSkills'; 
import Projects from './components/Projects';
import Experience from './components/Experience';
import ContactForm from './components/ContactForm';
import LiveDemoPage from './pages/LiveDemoPage'; // Import the Live Demo page component

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <AboutAndSkills /> 
              <Experience />
              <Projects />
              <ContactForm />
            </>
          }
        />
        {/* Live Demo Page */}
        <Route path="/live-demo" element={<LiveDemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

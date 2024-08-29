import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.background};
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactTitle>Contact</ContactTitle>
      <ContactInfo>
        <p>Email: <ContactLink href="mailto:elangley101@gmail.com">elangley101@gmail.com</ContactLink></p>
        <p>Phone: <ContactLink href="tel:3045469256">304.546.9256</ContactLink></p>
        <p>LinkedIn: <ContactLink href="https://linkedin.com/in/ethan-langley-44849b249/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ethan-langley-44849b249/</ContactLink></p>
        <p>Address: 1 St George Blvd, Savannah GA, USA, 31419</p>
      </ContactInfo>
    </ContactContainer>
  );
};

export default Contact;

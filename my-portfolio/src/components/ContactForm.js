// src/components/ContactForm.js
import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  padding: 100px 20px;
  background: #1e1e1e; /* Dark background */
  color: white;
  text-align: center;
`;

const ContactFormWrapper = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background: #232323; /* Slightly darker form background */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const FormField = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #bb86fc;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #1f1f1f; /* Dark input background */
  color: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #1f1f1f; /* Dark input background */
  color: white;
  height: 150px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #bb86fc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3700b3;
  }
`;

const ContactForm = () => {
  return (
    <ContactContainer>
      <h2>Contact Me</h2>
      <ContactFormWrapper>
        <FormField>
          <Label>Name</Label>
          <Input type="text" placeholder="Your Name" />
        </FormField>
        <FormField>
          <Label>Email</Label>
          <Input type="email" placeholder="Your Email" />
        </FormField>
        <FormField>
          <Label>Message</Label>
          <TextArea placeholder="Your Message"></TextArea>
        </FormField>
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactFormWrapper>
    </ContactContainer>
  );
};

export default ContactForm;

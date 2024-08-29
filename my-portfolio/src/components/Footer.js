// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Designed & Built by Ethan Langley
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;

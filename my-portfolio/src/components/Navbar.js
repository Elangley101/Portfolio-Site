import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${({ theme, $scrolled }) => ($scrolled ? theme.colors.background : 'transparent')};
  transition: background 0.3s ease;
  z-index: 1000;
`;
const NavbarList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
  margin-right: 50px;
`;

const NavbarItem = styled.li`
  margin-left: 20px;
`;

const NavbarLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarContainer $scrolled={scrolled}>
      <NavbarList>
        <NavbarItem>
          <NavbarLink href="#about">About</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="#experience">Experience</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="#projects">Projects</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink href="#contact">Contact</NavbarLink>
        </NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;

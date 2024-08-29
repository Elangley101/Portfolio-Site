import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the animation
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// List container without default bullet points
const List = styled.ul`
  list-style: none;
  padding-left: 20px;
`;

// List item with custom animated bullet point
const AnimatedListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;

  &::before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    margin-right: 10px;
  }
`;

// Reusable CustomList component
const CustomList = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <AnimatedListItem key={index} delay={index * 0.2}>
          {item}
        </AnimatedListItem>
      ))}
    </List>
  );
};

export default CustomList;

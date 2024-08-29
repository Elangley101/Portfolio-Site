import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.background};
`;

const SummaryTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const SummaryText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const Summary = () => {
  return (
    <SummaryContainer>
      <SummaryTitle>Professional Summary</SummaryTitle>
      <SummaryText>
        Junior Software Developer with 1-year of experience in backend development and database administration. Proven record of
        improving team productivity by 15% through agile methodology and optimizing system uptime by 20%. Notable
        accomplishments in developing full stack web applications and boosting operational efficiency by 30% using Docker tools. Eager
        to leverage expertise in collaborative, high-tech environments to build and maintain effective software solutions.
      </SummaryText>
    </SummaryContainer>
  );
};

export default Summary;

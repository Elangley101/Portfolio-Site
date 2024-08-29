import React from 'react';
import styled from 'styled-components';
import CustomList from './CustomList';

const CertificationsContainer = styled.section`
  padding: 100px 150px;
  background: ${({ theme }) => theme.colors.background};
`;

const CertificationsTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.subheading};
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Certifications = () => {
  const certifications = [
    "Certified: JAVA, Python, PHP, MySQL, JavaScript, ReactJS | Udemy",
    "Certified: Data Foundations | ICCP",
    "Promise Scholarship | State of West Virginia",
  ];

  const awards = [
    "Marshall University's Student of Achievement | Most dedicated student in department.",
    "President's List | 4.0 Semester GPA",
    "Dean's List | Marshall University",
  ];

  return (
    <CertificationsContainer>
      <CertificationsTitle>Certifications & Awards</CertificationsTitle>

      <SubTitle>Certifications</SubTitle>
      <CustomList items={certifications} />

      <SubTitle>Awards</SubTitle>
      <CustomList items={awards} />
    </CertificationsContainer>
  );
};

export default Certifications;

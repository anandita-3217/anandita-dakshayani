import React from 'react';
import AboutFull from '../components/AboutFull';
import Hobbies from '../components/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import TechSkills from '../components/AboutPageBits/TechSkills';
import ContributionMap from '../components/AboutPageBits/ContributionMap';
import Learning from '../components/AboutPageBits/Learning';
import Resume from '../components/Resume';

function AboutPage() {
  return (
    <>
      <AboutFull />
      <Hobbies />
      <Certificates />
      <TechSkills />
      <Learning/>
      <ContributionMap />
      <Resume />
    </>
  );
}

export default AboutPage;
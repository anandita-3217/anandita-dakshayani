import React from 'react';
import AboutFull from '../components/AboutFull';
import Hobbies from '../components/Hobbies';
import Certificates from '../components/AboutPageBits/Certificates';
import Skills from '../components/Skills';
import ContributionMap from '../components/ContributionMap';
import Resume from '../components/Resume';

function AboutPage() {
  return (
    <>
      <AboutFull />
      <Hobbies />
      <Certificates />
      <Skills />
      <ContributionMap />
      <Resume />
    </>
  );
}

export default AboutPage;
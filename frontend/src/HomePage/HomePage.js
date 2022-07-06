import React, { useState } from 'react';
import HomePageAppBar from './HomePageAppBar/HomePageAppBar';
import HomePageCard from './HomePageCard/HomePageCard';
import HomePageFooter from './HomePageFooter/HomePageFooter';
import HomePageHero from './HomePageHero/HomePageHero';

export default function HomePage() {
  return (
    <>
      <HomePageAppBar />
      <HomePageHero />
      <HomePageCard />
      <HomePageFooter />
    </>
  );
}

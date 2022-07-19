import React from "react";
import HomePageAppBar from "./HomePageAppBar/HomePageAppBar";
import HomePageBody from "./HomePageBody/HomePageBody";
import HomePageFooter from "./HomePageFooter/HomePageFooter";
import HomePageHero from "./HomePageHero/HomePageHero";

export default function HomePage() {
  return (
    <>
      <HomePageAppBar />
      <HomePageHero />
      <HomePageBody />
      <HomePageFooter />
    </>
  );
}

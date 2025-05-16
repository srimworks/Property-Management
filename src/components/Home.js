import React from "react";
import WhyChooseCards from "../reusable/WhyChooseCards";
import {
  BOTTOM_CONTENT,
  HOW_IT_WORKS_CARDS,
  OUR_SERVICES,
  WHY_CHOOSE_US_CARDS,
} from "../utils/constant";
import ServicesCards from "../reusable/ServicesCards";
import HowItWorksCards from "../reusable/HowItWorksCards";
import BottomContent from "../reusable/BottomContent";
import HomeHero from "../reusable/HomeHero";

const Home = () => {
  return (
    <div className="outlet-render-home">
      <HomeHero/>
      {/* <WhyChooseCards {...WHY_CHOOSE_US_CARDS} />
      <ServicesCards {...OUR_SERVICES} />
      <BottomContent {...BOTTOM_CONTENT} /> */}
    </div>
  );
};

export default Home;

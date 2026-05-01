import React from "react";
import AboutHero from "./AboutHero";
import WhyChooseSmartEprint from "./WhyChooseSmartEprint";
import WhatWeOffer from "./WhatWeOffer";
import OurCommitment from "./OurCommitment";
import MissionVision from "./MissionVision";
import Newsletter from "../home/Newsletter";
import SEO from '../common/SEO';

const AboutMain = () => {
  return (
    <>
       <SEO
           title="About Us"
           description="Learn about Smart ePrint — your trusted source for affordable printers, ink, and toner cartridges. Quality products with expert support."
           canonical="/about"
       />
       <AboutHero/>
       <WhyChooseSmartEprint/>
       <WhatWeOffer/>
       <OurCommitment/>
       <MissionVision/>
       <Newsletter bg="bg-[#f6eced]"/>
    </>
  );
};

export default AboutMain;

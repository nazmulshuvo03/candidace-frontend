import { LandingPage } from "@/components/LandingPage";
import { useRef } from "react";

// pages/index.js (Landing Page)
export async function getStaticProps() {
  // Fetch any data needed for the landing page here

  return {
    props: {
      // Pass the data as props to the component
    },
  };
}

const Landing = (props) => {
  const landingHowItWorksRef = useRef(null);
  const landingFaqsRef = useRef(null);

  const scrollToHowItWorks = () => {
    landingHowItWorksRef &&
      landingHowItWorksRef.current &&
      landingHowItWorksRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFaqs = () => {
    landingFaqsRef &&
      landingFaqsRef.current &&
      landingFaqsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return <LandingPage {...{ landingHowItWorksRef, landingFaqsRef }} />;
};

export default Landing;

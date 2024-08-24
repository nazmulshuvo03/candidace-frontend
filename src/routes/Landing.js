import { LandingPage } from "../components/LandingPage";

const Landing = ({ landingHowItWorksRef, landingFaqsRef }) => {
  return <LandingPage {...{ landingHowItWorksRef, landingFaqsRef }} />;
};

export default Landing;

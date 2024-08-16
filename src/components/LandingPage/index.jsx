import { useRef } from "react";
import { Footer } from "../Footer";
import { BrowseNetwork } from "./BrowseNetwork";
// import { Companies } from "./Companies";
import { Faqs } from "./Faqs";
import { Header } from "./Header";
import { InsideTrack } from "./InsideTrack";
import { Join } from "./Join";
import { Quote } from "./Quote";
import { StepsOverview } from "./StepsOverview";
import { Testimonials } from "./Testimonials";

export const LandingPage = ({ landingHowItWorksRef, landingFaqsRef }) => {
  const learnMoreRef = useRef(null);

  const scrollToLearnMore = () => {
    learnMoreRef &&
      learnMoreRef.current &&
      learnMoreRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full">
      <Header scrollToLearnMore={scrollToLearnMore} />
      <InsideTrack reference={learnMoreRef} />
      <BrowseNetwork />
      <StepsOverview reference={landingHowItWorksRef} />
      <Quote />
      <Testimonials />
      {/* <Companies /> */}
      <Faqs reference={landingFaqsRef} />
      <Join />
      <Footer />
    </div>
  );
};

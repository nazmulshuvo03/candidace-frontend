import { LandingPage } from "@/components/LandingPage";

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
  return <LandingPage />;
};

export default Landing;

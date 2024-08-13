// pages/index.js (Landing Page)
export async function getStaticProps() {
  // Fetch any data needed for the landing page here

  return {
    props: {
      // Pass the data as props to the component
    },
  };
}

const LandingPage = (props) => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default LandingPage;

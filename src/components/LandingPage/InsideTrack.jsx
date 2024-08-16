const Content = ({ text = "" }) => (
  <div className="flex items-center gap-6">
    <img src="/images/landingPage/box.svg" alt="icon" className="h-4 w-4" />
    {text}
  </div>
);

export const InsideTrack = ({ reference }) => {
  return (
    <section
      className="flex flex-col md:flex-row py-8 md:py-14 bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
      ref={reference}
    >
      <div className="flex-1 flex items-center justify-start">
        <div>
          <div className="text-2xl md:text-4xl font-semibold py-4">
            The Inside Track on Landing Your Dream Job
          </div>
          <div className="py-4 text-base md:text-lg font-normal flex flex-col gap-3">
            <Content text="Find peers with experience at your target companies" />
            <Content text="Filter by role, experience level, and interviewing goals to find your ideal practice partner" />
            <Content text="Practice unlimited number of mock interviews on your schedule" />
            <Content text="Get valuable feedback to identify strengths and improvement areas" />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-10 py-4 md:w-2/5">
        <img src={"/images/landingPage/videoCall.svg"} alt="Inside Track" />
      </div>
    </section>
  );
};

const Content = ({ title = "", desc = "" }) => (
  <div className="text-end">
    <div className="text-xl md:text-3xl font-bold py-1">{title}</div>
    <div className="text-sm md:text-base font-light py-1">{desc}</div>
  </div>
);

export const StepsOverview = ({ reference }) => {
  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center py-8 md:py-14 bg-white"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
      ref={reference}
    >
      <div className="px-4 md:px-10 py-4 md:w-2/5">
        <img src={"/images/landingPage/processing.svg"} alt="Steps Overview" />
      </div>
      <div className="flex flex-col items-end justify-start gap-2 md:gap-6">
        <Content
          title="Sign Up and Connect with Peers"
          desc="Create an account and start connecting with professionals in your field. Book practice sessions around your schedule."
        />
        <Content
          title="Schedule and Practice Interviews"
          desc="Take turns being the interviewee and the interviewer. Get perspectives from diverse candidates."
        />
        <Content
          title="Get Honest, Valuable Feedback"
          desc="Get specific feedback to improve your skills. Track your progress over time and identify growth areas."
        />
      </div>
    </div>
  );
};

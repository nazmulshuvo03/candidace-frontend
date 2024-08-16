import { PageBlock } from "../components/Layouts/PageBlock";

const AboutUs = () => {
  return (
    <PageBlock title="About Us" className={"!w-2/3 !h-2/3"}>
      <p className="text-gray-500 text-justify mb-4">
        Candidace.fyi is a peer-to-peer network that revolutionizes the way job
        candidates prepare for interviews. Our platform addresses a critical
        pain point - nearly half of job seekers feel unprepared going into
        interviews, leading to poor performance and missed opportunities.
        Candidace.fyi provides a seamless environment for candidates to connect
        with others targeting similar roles, conduct mock interviews, and
        receive valuable feedback to hone their interviewing skills.
      </p>
      <p className="text-gray-500 text-justify mb-4">
        Through our user-friendly interface, members can create detailed
        profiles highlighting their experience, target companies, and
        interviewing goals. They can then browse and filter through a vast
        network of peers to find ideal mock interview partners. Our streamlined
        booking process ensures candidates can practice at their convenience
        with relevant individuals. Post-interview, our rating system promotes
        accountability and helps candidates identify areas for improvement. With
        Candidace.fyi, achieving interview confidence and landing the desired
        role becomes an effortless reality.
      </p>
    </PageBlock>
  );
};

export default AboutUs;

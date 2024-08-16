import { FaqCard } from "./FaqCard";

export const Faqs = ({ reference }) => {
  const FAQS = [
    {
      id: 1,
      qn: "What is Candidace.fyi?",
      ans: "Candidace.fyi is a peer-to-peer platform that connects job candidates to practice mock interviews with each other for better interview preparation.",
    },
    {
      id: 2,
      qn: "How does it work?",
      ans: "Sign up, create your profile detailing your target role/companies, then browse and schedule mock interviews with similar candidates targeting the same roles or companies.",
    },
    {
      id: 3,
      qn: "Why is it better than practicing with friends?",
      ans: "Friends often lack the specific role experience to provide quality, objective feedback. Candidace.fyi lets you practice with professionals in your target field.",
    },
    {
      id: 4,
      qn: "What roles can I practice for?",
      ans: "You can practice for product management and management consulting interviews.",
    },
    {
      id: 5,
      qn: "How much does it cost?",
      ans: "The basic membership is currently free, with a $19/month premium subscription planned for upcoming releases with advanced features.",
    },
    {
      id: 6,
      qn: "Can I practice interviews for companies I'm actually applying to?",
      ans: "Yes, you can filter candidates by their past experience at your target companies for highly relevant practice.",
    },
    {
      id: 7,
      qn: "Is there a mobile app?",
      ans: "Not currently, but Candidace.fyi is fully mobile responsive so you can use it seamlessly to schedule meetings on your phone's browser. However, we recommend you use desktop to practice mock interviews.",
    },
  ];

  return (
    <div
      className="py-6 md:py-16"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
      ref={reference}
    >
      <div className="pb-6">
        <div className="text-2xl md:text-4xl font-bold pb-4">FAQs</div>
        <div className="text-xs md:text-base font-medium">
          Find answers to common questions about the service, interview
          preparation, and technical requirements.
        </div>
      </div>
      <div className="py-6">
        {FAQS.map((faq) => (
          <FaqCard data={faq} key={faq.id} />
        ))}
      </div>
    </div>
  );
};

import { TestimonialCard } from "./TestimonialCard";

export const Testimonials = () => {
  const TESTIMONIALS = [
    {
      id: 1,
      name: "David S",
      position: "Sr. Product Manager",
      company: "Microsoft",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "I was blown away by how much more prepared I felt after doing mock interviews on Candidace.fyi with people who actually worked at my dream company!",
      star: 5,
    },
    {
      id: 2,
      name: "Tracy K",
      position: "Product Manager",
      company: "TikTok",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "The scheduling flexibility on Candidace.fyi is unbeatable. I easily lined up half a dozen mocks before my Microsoft final rounds!",
      star: 5,
    },
    {
      id: 3,
      name: "Vipul M",
      position: "Sr. Technical Product Manager",
      company: "Mastercard",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Practicing interviews on Candidace.fyi made me so much more confident. I absolutely nailed the product sense questions thanks to your amazing platform!",
      star: 5,
    },
    {
      id: 4,
      name: "Pooja S",
      position: " Sr. Business Analyst",
      company: "Flipkart",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Candidace.fyi helped me nail my product manager interview with Amazon by practicing with experienced pros from Meta, Visa, and Google.",
      star: 5,
    },
    {
      id: 5,
      name: "Ashley T",
      position: "Product Manager",
      company: "LinkedIn",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "My friends mean well, but getting razored by experienced hiring managers on Candidace.fyi was brutal - and exactly what I needed to level up.",
      star: 5,
    },
    {
      id: 6,
      name: "Nick L",
      position: "Sr. Product Manager",
      company: "Tech - Amazon",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "I couldn't believe how much more confident I felt after just a few mock interviews on Candidace.fyi - it was like night and day! The feedback was invaluable.",
      star: 5,
    },
  ];

  return (
    <div
      className="bg-white py-6 md:py-16"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="text-center pb-6">
        <div className="text-2xl md:text-4xl font-bold">
          Customer testimonials
        </div>
        <div className="text-xs md:text-base font-medium">
          See what our users are saying about their experience
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 md:py-6">
        {TESTIMONIALS.map((tm) => (
          <TestimonialCard data={tm} key={tm.id} />
        ))}
      </div>
    </div>
  );
};

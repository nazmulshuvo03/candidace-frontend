import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { FAQ } from "../components/FAQ";
import { NumberCounter } from "../components/NumberCounter";

const Landing = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, auth: "login" },
    });
  };

  const handleSignupClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, auth: "signup" },
    });
  };

  const faqs = [
    {
      question: "Is Candidace free to use?",
      answer:
        "Yes, Candidace offers a free tier that lets you conduct practice interviews and receive feedback. Premium features are available for enhanced experience.",
    },
    {
      question: "How does the matching system work?",
      answer:
        "We match you with peers based on your industry, role, experience level, and availability to ensure the most relevant practice experience.",
    },
    {
      question: "What kind of feedback will I receive?",
      answer:
        "You'll get structured feedback on your interview performance, including communication skills, technical knowledge, and areas for improvement.",
    },
    {
      question: "How many practice interviews can I do?",
      answer:
        "Free tier users can conduct up to 3 practice interviews per month. Premium users get unlimited practice sessions with advanced features.",
    },
    {
      question: "Can I choose my interview partner?",
      answer:
        "Yes, you can browse through available partners and send interview requests to those who match your preferences and schedule.",
    },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 py-auto px-auto md:px-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="w-full mx-auto flex flex-col md:flex-row items-center gap-12 relative min-h-[calc(100vh-6rem)]">
          <div className="flex-1 text-center md:text-left animate-fadeIn">
            <div className="inline-block py-2 bg-secondary/10 rounded-full text-secondary font-medium text-sm">
              🎯 Trusted by professionals from top tech companies
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Level Up Your{" "}
              <span className="text-secondary">Interview Game</span> with Peer
              Practice
            </h1>
            <p className="text-xl text-gray-600 mb-20 max-w-2xl">
              Join a community of job seekers practicing together. Get real
              interview experience, actionable feedback, and land your dream
              role faster.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button
                onClick={handleSignupClick}
                className="!bg-secondary !text-white !px-8 !py-4 !text-lg !font-semibold hover:!opacity-90 transform transition duration-200 hover:scale-105 w-[13rem]"
              >
                Start Free Practice
              </Button>
              <Button
                onClick={handleLoginClick}
                className="!bg-secondary !text-white !px-8 !py-4 !text-lg !font-semibold hover:!opacity-90 transform transition duration-200 hover:scale-105 w-[13rem]"
              >
                Sign In
              </Button>
            </div>
            <div className="mt-8 text-sm text-gray-500 flex items-center gap-2 justify-center md:justify-start">
              <svg
                className="w-5 h-5 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              No credit card required • Free to get started
            </div>
          </div>
          <div className="flex-1 relative animate-float h-[60vh] flex items-center justify-center group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative">
              <img
                src="/images/landingPage/videoCall.svg"
                alt="Practice interviews with peers"
                className="w-full max-w-lg mx-auto drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img
                src="/images/landingPage/box.svg"
                alt="Practice"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">
                Practice Interviews
              </h3>
              <p className="text-gray-600">
                Schedule and conduct mock interviews with peers in your field
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img
                src="/images/landingPage/processing.svg"
                alt="Feedback"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">Real Feedback</h3>
              <p className="text-gray-600">
                Get actionable feedback to improve your interview performance
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <img
                src="/images/landingPage/signup.svg"
                alt="Profile"
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">Profile Building</h3>
              <p className="text-gray-600">
                Create a comprehensive profile to match with relevant practice
                partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-white py-16 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl text-gray-600 mb-8">
            Trusted by professionals from leading companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img
              src="/images/landingPage/company1.svg"
              alt="Company 1"
              className="h-8 opacity-50 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/landingPage/company2.svg"
              alt="Company 2"
              className="h-8 opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Complete Profile</h3>
              <p className="text-gray-600">Add your experience and goals</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Find Partners</h3>
              <p className="text-gray-600">Match with relevant peers</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Practice</h3>
              <p className="text-gray-600">Conduct mock interviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <NumberCounter end={5000} suffix="+" />
              <p className="text-gray-600">Practice Interviews Conducted</p>
            </div>
            <div className="text-center">
              <NumberCounter end={85} suffix="%" />
              <p className="text-gray-600">Success Rate in Real Interviews</p>
            </div>
            <div className="text-center">
              <NumberCounter end={3000} suffix="+" />
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <NumberCounter end={20} suffix="+" />
              <p className="text-gray-600">Industry Domains</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Candidace?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-secondary text-2xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Targeted Practice</h3>
              <p className="text-gray-600">
                Match with peers in your specific industry and role for the most
                relevant practice experience
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-secondary text-2xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">Expert Insights</h3>
              <p className="text-gray-600">
                Get valuable feedback from peers who understand your industry's
                specific requirements
              </p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-secondary text-2xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed feedback and performance
                analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Smith</h4>
                  <p className="text-gray-600 text-sm">
                    Software Engineer at Google
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "Candidace helped me prepare thoroughly for my technical
                interviews. The peer feedback was invaluable!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alice Stevens</h4>
                  <p className="text-gray-600 text-sm">
                    Product Manager at Microsoft
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "The structured practice interviews and detailed feedback helped
                me land my dream job!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Ryan Kumar</h4>
                  <p className="text-gray-600 text-sm">
                    Data Scientist at Amazon
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "The platform's matching system helped me find perfect practice
                partners in my field."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Improve Your Interview Skills?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of job seekers who are practicing and improving
            together.
          </p>
          <Button
            onClick={handleSignupClick}
            className="!bg-white !text-secondary !px-8 !py-3"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

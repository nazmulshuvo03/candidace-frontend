import { useRouter } from "next/router";
import { Button } from "../Button";
import { useSelector } from "react-redux";

const Content = ({ text = "" }) => (
  <div className="flex flex-col justify-center items-center gap-6">
    <img
      src="/images/landingPage/box.svg"
      alt="icon"
      className="h-10 md:h-16 w-10 md:w-16"
    />
    <div className="text-lg md:text-3xl font-bold text-center">{text}</div>
  </div>
);

export const BrowseNetwork = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleAction = () => {
    if (!isAuthenticated) {
      router.push({
        search: "?auth=signup",
      });
    } else {
      router.push("/dashboard/people");
    }
  };

  return (
    <div
      className="py-8 md:py-16"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 py-6 gap-4">
        <Content text="Learn directly from people who understand your desired role" />
        <Content text="Get insights into company cultures, processes and expectations" />
        <Content text="Practice role-specific case studies and technical questions" />
      </div>
      <div className="flex justify-center py-6">
        <Button
          size="large"
          className={"border border-text"}
          onClick={handleAction}
        >
          Browse the Candidace Network
        </Button>
      </div>
    </div>
  );
};

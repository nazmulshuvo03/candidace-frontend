import { useRouter } from "next/router";
import { Button } from "../Button";
import { useSelector } from "react-redux";

export const Join = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleAction = () => {
    if (!isAuthenticated) {
      router.push({
        search: "?auth=signup",
      });
    } else {
      router.push("/people");
    }
  };

  return (
    <div
      className="bg-white py-6 md:py-16 flex flex-col md:flex-row justify-between gap-4 md:gap-10"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="text-xl md:text-3xl font-semibold">
        Join 1000+ candidates leveling up together
      </div>
      <div>
        <div className="text-xs md:text-base font-medium pb-6">
          Sign Up now and start practicing. Its fast, free, and the best way to
          ensure you nail your next interview.
        </div>
        <Button className={"border border-text"} onClick={handleAction}>
          {!isAuthenticated ? "Join" : "Profile"}
        </Button>
      </div>
    </div>
  );
};

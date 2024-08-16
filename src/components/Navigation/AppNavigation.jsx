import { TabNavigation } from "./TabNavigation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Intro } from "../Intro";

export const AppNavigation = () => {
  const location = useLocation();
  const [openIntro, setOpenIntro] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const introParam = searchParams.get("intro");
    if (introParam && introParam === "signup") {
      setOpenIntro("signup");
    } else setOpenIntro("");
  }, [location.search]);

  return (
    <div>
      <div className="h-full hidden md:block" style={{ width: "17vw" }}>
        <TabNavigation />
      </div>
      {openIntro && <Intro type={openIntro} />}
    </div>
  );
};

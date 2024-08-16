import { TabNavigation } from "./TabNavigation";
import { useEffect, useState } from "react";
import { Intro } from "../Intro";
import { useRouter } from "next/router";

export const AppNavigation = () => {
  const router = useRouter();
  const [openIntro, setOpenIntro] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(router.search);
    const introParam = searchParams.get("intro");
    if (introParam && introParam === "signup") {
      setOpenIntro("signup");
    } else setOpenIntro("");
  }, [router.search]);

  return (
    <div>
      <div className="h-full hidden md:block" style={{ width: "17vw" }}>
        <TabNavigation />
      </div>
      {openIntro && <Intro type={openIntro} />}
    </div>
  );
};

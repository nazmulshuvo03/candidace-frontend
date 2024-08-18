import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { ProfileAvatar } from "../ProfileAvatar";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { TabNavigation } from "./TabNavigation";
import { Drawer } from "../Drawer";
import { Banner } from "../Banner";
import { isAllTrue } from "../../utils/object";
import { completionRemaining } from "../../utils/profile";
import { Auth } from "../Landing/Auth";
import { resendVerificationEmail } from "../../store/middlewares/auth";
import { GoogleAuth } from "../Landing/GoogleAuth";
import { Notification } from "../Notification";
import { Message } from "../Message";
import { useRouter } from "next/router";
import Link from "next/link";
import CircularProgress from "../ProgressBar";
import Toast from "../Toast";
import ModalMessage from "../ModalMessages";
import { Chats } from "../Message/Chats";
import { fetchProfessions } from "@/store/middlewares/profession";
import {
  fetchCompanies,
  fetchExperienceLevels,
  fetchPreparationStages,
} from "@/store/middlewares/static";
import {
  fetchAllExperienceType,
  fetchAllSkill,
} from "@/store/middlewares/skill";
import { shouldUpdateLastVisit, updateLastVisit } from "@/utils/visit";

export const Navigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const global = useSelector((state) => state.global);
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const profile = useSelector((state) => state.user.profile);
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [authMode, setAuthMode] = useState("");
  const [openTabNavs, setOpenTabNavs] = useState(false);

  useEffect(() => {
    dispatch(fetchProfessions());
    dispatch(fetchExperienceLevels());
    dispatch(fetchPreparationStages());
    dispatch(fetchCompanies());
    dispatch(fetchAllSkill());
    dispatch(fetchAllExperienceType());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (shouldUpdateLastVisit()) {
        dispatch(updateLastVisit());
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const modeParam = router?.query?.auth || "";
    if (modeParam) {
      setAuthMode(modeParam);
    } else setAuthMode("");
  }, [router.query]);

  const isDashboard = () => {
    const dashboardRoutes = ["/people", "/profile", "/progress", "/interviews"];
    return dashboardRoutes.includes(router.pathname);
  };

  const navLinks = [
    ...(isDashboard()
      ? []
      : [
          // { to: "/about-us", name: "About Us" },
          // {
          //   name: "How it works",
          //   type: "button",
          //   clickHandler: scrollToHowItWorks,
          // },
          // { name: "FAQs", type: "button", clickHandler: scrollToFaqs },
          ...(isAuthenticated ? [] : []),
        ]),
  ];

  const handleLoginClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, auth: "login" },
    });
  };

  const handleResendClick = async () => {
    await dispatch(resendVerificationEmail());
  };

  return (
    <>
      <Banner
        text={
          <a
            href="https://forms.gle/WFMQhmP98HdyQwXy6"
            target="_blank"
            className="hover:underline"
          >
            This website is currently under active construction. Please inform
            us of any anomalies or issues you encounter
            <span className="text-blue-600 px-1 font-semibold">here</span>.
            Thank you for your patience.
          </a>
        }
      />
      {completionStatus && !isAllTrue(completionStatus) && (
        <Banner
          className="!bg-red-800 !text-white !font-normal"
          text={`Profile is not complete at this moment. You will have to provide ${completionRemaining(
            completionStatus
          )}.`}
        />
      )}
      {profile && !profile.email_verified && (
        <Banner
          className="!bg-cyan-600 !text-white !font-normal"
          text={
            <div>
              Email address is not verified yet. Please check email inbox or
              <span
                onClick={handleResendClick}
                className="text-blue-800 px-1 font-semibold cursor-pointer"
              >
                click here
              </span>
              to resend it
            </div>
          }
        />
      )}
      {authMode && <Auth authMode={authMode} />}
      {!isAuthenticated && <GoogleAuth useOneTap />}
      <div className="bg-primary flex justify-between w-full h-16 items-center px-5 z-10">
        {isAuthenticated && (
          <div className="visible md:hidden">
            <IconButton onClick={() => setOpenTabNavs((prev) => !prev)}>
              <FontAwesomeIcon icon={faBars} className="text-text h-4 w-4" />
            </IconButton>
          </div>
        )}
        <div className="text-3xl font-semibold opacity-75 h-full">
          <Link href={"/dashboard/profile"} className="text-gray-900 h-full">
            <img
              src={"/images/logo_full.svg"}
              alt="Candidace Logo"
              style={{ height: "100%", width: "100%" }}
            />
          </Link>
        </div>
        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.type && link.type === "button") {
                return (
                  <Button
                    className="h-fit rounded-lg !text-slate-950 dark:text-slate-50 !font-normal !p-0 !bg-transparent"
                    key={link.name}
                    onClick={link.clickHandler}
                  >
                    {link.name}
                  </Button>
                );
              } else {
                return (
                  <Link
                    key={link.name}
                    href={link.to}
                    className="h-fit rounded-lg !text-slate-950 dark:text-slate-50"
                  >
                    {link.name}
                  </Link>
                );
              }
            })}
          </nav>
          {isAuthenticated && <Notification />}
          {isAuthenticated && <Message />}
          {isAuthenticated ? (
            <ProfileAvatar />
          ) : (
            <Button
              className={
                "border border-gray-700 !bg-secondary rounded-none !font-normal !text-white"
              }
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <Drawer open={openTabNavs} setOpen={setOpenTabNavs}>
        <TabNavigation />
      </Drawer>

      {global?.loading && <CircularProgress />}
      {global?.toastMessage && <Toast {...{ ...global.toastMessage }} />}
      {global?.modalMessageData && <ModalMessage />}
      {global?.chat && Object.keys(global.chat).length !== 0 && <Chats />}
    </>
  );
};

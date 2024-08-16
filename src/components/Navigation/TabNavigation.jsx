import {
  faAddressCard,
  faCalendarDay,
  faChartLine,
  faClipboardQuestion,
  faScrewdriverWrench,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { LoggedFooter } from "../Footer/LoggedFooter";
import Link from "next/link";
import { useRouter } from "next/router";

export const TabNavigation = () => {
  const router = useRouter();
  const global = useSelector((state) => state.global);

  const navLinks = [
    ...(global.isAuthenticated
      ? [
          {
            to: "/people",
            name: "People",
            icon: <FontAwesomeIcon icon={faUsers} />,
          },
          {
            to: "/profile",
            name: "Profile",
            icon: <FontAwesomeIcon icon={faAddressCard} />,
          },
          {
            to: "/availability",
            name: "Schedule",
            icon: <FontAwesomeIcon icon={faCalendarDay} />,
          },
          {
            to: "/progress",
            name: "Progress",
            icon: <FontAwesomeIcon icon={faChartLine} />,
          },
          {
            to: "/interviews",
            name: "Interviews",
            icon: <FontAwesomeIcon icon={faClipboardQuestion} />,
          },
        ]
      : []),
    ...(global.isAdmin
      ? [
          {
            to: "/admin",
            name: "Admin",
            icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
          },
        ]
      : []),
  ];

  const isRouteActive = (routePath) => {
    return router.pathname === routePath;
  };

  return (
    <div className="bg-white pt-20 overflow-hidden h-full w-full border-r-2 border-slate-300 flex flex-col justify-between">
      <nav className="">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.to}
            isActive={() => isRouteActive(link.to)}
            className="text-text w-full h-8 flex justify-start items-center gap-2 cursor-pointer text-sm font-medium pl-4 md:pl-10 px-2 !text-gray-700"
            activeClassName="bg-accent text-gray-700 cursor-default font-semibold"
          >
            <div className="text-base">{link.icon}</div>
            <div>{link.name}</div>
          </Link>
        ))}
      </nav>
      <LoggedFooter />
    </div>
  );
};

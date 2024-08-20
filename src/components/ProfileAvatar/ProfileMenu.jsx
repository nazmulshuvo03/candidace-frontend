import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/middlewares/auth";
// import { ThemeProvider } from "../ThemeProvider";
import { googleLogout } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuLink = ({ children, ...props }) => (
  <div
    className="border-t py-2 px-3 font-light text-xs text-gray-600 hover:text-gray-800 flex items-center justify-center cursor-pointer"
    {...props}
  >
    {children}
  </div>
);

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.profile);

  const handleLogout = async () => {
    await dispatch(logoutUser({ userId: user.id }));
    googleLogout();
    router.push({
      pathname: "/",
      query: "",
    });
  };

  return (
    <div className="absolute top-12 right-0 bg-white text-text rounded-sm drop-shadow-lg min-w-36">
      {user && (
        <div className="px-3 py-2 text-right">
          {user.userName ? (
            <div className="font-semibold text-base">
              <span>{user.userName}</span>
            </div>
          ) : (
            <div className="font-semibold text-base">
              <span>{user.firstName}</span>
              <span> </span>
              <span>{user.lastName}</span>
            </div>
          )}
          <div className="font-light text-xs text-gray-500">{user.email}</div>
        </div>
      )}
      <MenuLink>
        <Link href="/dashboard/message">Messages</Link>
      </MenuLink>
      <MenuLink>
        <Link href="/about-us">About Us</Link>
      </MenuLink>
      <MenuLink>
        <Link href="/how-it-works">How It Works</Link>
      </MenuLink>
      {/* <div className="border-t py-3">
        <ThemeProvider />
      </div> */}
      <MenuLink onClick={handleLogout}>Log Out</MenuLink>
    </div>
  );
};

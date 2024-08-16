import { useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useSelector } from "react-redux";
import { ForgetPass } from "./ForgetPass";
import { useRouter } from "next/router";

export const Auth = ({ authMode = "" }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const changeAuthMode = (changeTo = "") => {
    router.push({
      search: `?auth=${changeTo}`,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (router.pathname && router.pathname === "/") {
        router.push(
          `/people/${authMode === "signup" ? "?intro=" + authMode : ""}`
        );
      } else {
        router.push({
          search: "",
        });
      }
    }
  }, [isAuthenticated]);

  return (
    <div
      className="fixed top-0 left-0 h-full w-full z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="fixed top-0 left-0 w-full h-full"
        onClick={() =>
          router.push({
            search: "",
          })
        }
      />
      <div className="absolute right-0 w-3/4 lg:w-1/2 xl:w-1/3 h-full bg-white z-50 shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="h-full">
          {authMode === "login" ? (
            <Login switchMode={changeAuthMode} />
          ) : authMode === "forget_password" ? (
            <ForgetPass switchMode={changeAuthMode} />
          ) : (
            <Signup switchMode={changeAuthMode} />
          )}
        </div>
      </div>
    </div>
  );
};

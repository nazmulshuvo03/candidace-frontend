import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const global = useSelector((state) => state.global);
    const router = useRouter();

    useEffect(() => {
      if (!global.isAuthenticated) {
        router.push({
          pathname: "/",
          query: { auth: "login" },
        });
      }
    }, [global.isAuthenticated]);

    return global.isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;

import {
  ADMIN_ROUTES,
  AUTHOR_ROUTES,
  COMMON_AUTHENTICATED_ROUTES,
} from "@/components/Navigation/TabNavigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const global = useSelector((state) => state.global);
    const router = useRouter();
    const { slug } = router.query;
    const firstSlug = slug?.[0];

    useEffect(() => {
      if (!global.isAuthenticated) {
        router.push({
          pathname: "/",
          query: { auth: "login" },
        });
      }
    }, [global.isAuthenticated]);

    useEffect(() => {
      if (firstSlug) {
        const slugInCommonRoutes = COMMON_AUTHENTICATED_ROUTES.some(
          (route) => route.to === `/${firstSlug}`
        );
        const slugInAdminRoutes = ADMIN_ROUTES.some(
          (route) => route.to === `/${firstSlug}`
        );
        const slugInAuthorRoutes = AUTHOR_ROUTES.some(
          (route) => route.to === `/${firstSlug}`
        );
        if (global.isAuthor && !slugInAuthorRoutes) {
          router.push({
            pathname: "/dashboard/people",
          });
        } else if (global.isAdmin && !slugInAdminRoutes) {
          router.push({
            pathname: "/dashboard/people",
          });
        } else if (!global.isAdmin && !global.isAuthor && !slugInCommonRoutes) {
          router.push({
            pathname: "/dashboard/people",
          });
        }
      }
    }, [firstSlug]);

    return global.isAuthenticated && slug && slug.length ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};

export default withAuth;

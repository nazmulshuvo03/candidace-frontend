import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visitUserProfile } from "../store/middlewares/user";
import { clearVisitingProfile } from "../store/slices/user";
import { UserProfile } from "../components/Profile";
import { useRouter } from "next/router";

const Visit = () => {
  const router = useRouter();
  const { userId } = router.query;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const profile = useSelector((state) => state.user.visitingProfile);

  useEffect(() => {
    if (userId) {
      dispatch(visitUserProfile(userId));
    }
    return () => {
      dispatch(clearVisitingProfile());
    };
  }, [isAuthenticated, userId]);

  return <>{profile ? <UserProfile visit={true} /> : <div />}</>;
};

export default Visit;

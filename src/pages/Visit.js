import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { visitUserProfile } from "../store/middlewares/user";
import { clearVisitingProfile } from "../store/slices/user";
import { UserProfile } from "../components/Profile";

const Visit = () => {
  const { userId } = useParams();
  const history = useHistory();

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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmailVerification } from "../store/middlewares/auth";
import CircularProgress from "../components/ProgressBar";
import { useRouter } from "next/router";

const Verify = () => {
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (profile && token) {
      dispatch(
        validateEmailVerification({
          userId: profile.id,
          token,
        })
      );
    } else if (!profile) {
      router.push({
        search: "?auth=login",
      });
    }
  }, [token, profile]);

  return (
    <div className="!z-20">
      <CircularProgress />
    </div>
  );
};

export default Verify;

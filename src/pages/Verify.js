import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { validateEmailVerification } from "../store/middlewares/auth";
import CircularProgress from "../components/ProgressBar";

const Verify = () => {
  const { token } = useParams();
  const history = useHistory();
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
      history.push({
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

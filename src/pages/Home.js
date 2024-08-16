import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchUserProfile } from "../store/middlewares/user";

const Home = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchUserProfile(
          userId,
          () => history.push("/profile"),
          () => history.push("/?auth=login")
        )
      );
    }
  }, [userId]);

  return <div />;
};

export default Home;

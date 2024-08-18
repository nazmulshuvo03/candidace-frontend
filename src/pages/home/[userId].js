import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/middlewares/user";
import { useRouter } from "next/router";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchUserProfile(
          userId,
          () => router.push("/profile"),
          () => router.push("/?auth=login")
        )
      );
    }
  }, [userId]);

  return <div />;
};

export default Home;

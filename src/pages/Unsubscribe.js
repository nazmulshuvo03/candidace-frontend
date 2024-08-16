import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { changeUserSubscription } from "../store/middlewares/user";
import { useRouter } from "next/router";

const Unsubscribe = () => {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (!profile) {
      router.push({
        search: "?auth=login",
      });
    }
  }, [profile, userId]);

  const handleUnsubscribe = async () => {
    await dispatch(
      changeUserSubscription({
        userId,
        status: true,
      })
    );
    router.push("/");
  };

  if (profile) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {profile.id === userId ? (
          <div className="flex flex-col items-center gap-2">
            {profile.unsubscribed ? (
              <>
                <div>
                  You have already unsubscribed all email from Candidace
                </div>
                <Button
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Go to Profile
                </Button>
              </>
            ) : (
              <>
                <div>
                  Are you sure you want to unsubscribe all email from Candidace?
                </div>
                <Button onClick={handleUnsubscribe}>Click Here</Button>
              </>
            )}
          </div>
        ) : (
          <div>You are not authorized for this profile </div>
        )}
      </div>
    );
  }
};

export default Unsubscribe;

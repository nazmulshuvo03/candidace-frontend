import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { setModalMessageData } from "../../store/slices/global";
import { useRouter } from "next/router";

export const ResetPassSuccess = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/?auth=login");
      dispatch(setModalMessageData(null));
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="py-8 px-20">
      <div className="text-center text-green-500 font-light text-3xl">
        {data.message}
      </div>
      <div className="flex gap-10 pb-10 justify-center py-4">
        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 h-24" />
      </div>
    </div>
  );
};

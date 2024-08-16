import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MandatoryStar = () => {
  return (
    <span className="">
      <FontAwesomeIcon
        icon={faStar}
        className="text-red-500 pb-2 pr-0.5"
        style={{ fontSize: "5px" }}
      />
    </span>
  );
};

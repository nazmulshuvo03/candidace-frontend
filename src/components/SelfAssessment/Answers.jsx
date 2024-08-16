import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Answers = ({
  value = 0,
  setValue = () => {},
  count = 5,
  color = "yellow",
}) => {
  return (
    <>
      {[...Array(count).keys()].map((i) => {
        return (
          <div
            className={`col-span-1 items-center justify-self-center ${
              i + 1 === value ? "cursor-default" : "cursor-pointer"
            }`}
            key={i}
          >
            <FontAwesomeIcon
              className={`text-${color}-400`}
              icon={i + 1 === value ? faCircle : faCircleRegular}
              onClick={() => setValue(i + 1)}
            />
          </div>
        );
      })}
    </>
  );
};

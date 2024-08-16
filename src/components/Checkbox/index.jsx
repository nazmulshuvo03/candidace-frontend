import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Checkbox = ({
  label = "",
  checked = false,
  setChecked = () => {},
  className = "",
  round = false,
}) => {
  return (
    <div
      className={`cursor-pointer w-full h-full ${className}`}
      onClick={setChecked}
    >
      <label className="text-xs">{label}</label>
      {!checked ? (
        <div
          className={`h-5 w-5 border border-gray-400 flex justify-center items-center ${
            round ? "rounded-full" : ""
          }`}
          style={{ margin: "5px 0 11px" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="!text-green-500 h-5 w-5"
          style={{ margin: "5px 0 11px" }}
        />
      )}
    </div>
  );
};

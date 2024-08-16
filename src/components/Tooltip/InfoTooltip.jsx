import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from ".";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const InfoTooltip = ({
  message = "",
  tooltoipClass = "",
  tooltipPostion = "top",
}) => {
  return (
    <Tooltip text={message} className={tooltoipClass} position={tooltipPostion}>
      <div className="flex h-full">
        <FontAwesomeIcon className="text-xs text-text" icon={faCircleInfo} />
      </div>
    </Tooltip>
  );
};

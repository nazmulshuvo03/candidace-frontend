import { MandatoryStar } from "../MandatoryStar";
import { InfoTooltip } from "../Tooltip/InfoTooltip";

export const Block = ({
  children,
  title = "",
  titleStar = false,
  className = "",
  titleClass = "",
  titleInfo = "",
  infoClass = "",
  infoPosition = "top",
  ...rest
}) => {
  return (
    <div
      className={`bg-white px-4 py-3 h-fit w-full flex flex-col rounded-md shadow-md ${className}`}
      {...rest}
    >
      {title && (
        <div
          className={`font-semibold text-lg pt-2 pb-3 ${titleClass} flex items-center gap-1`}
        >
          {title}{" "}
          {titleInfo ? (
            <InfoTooltip
              message={titleInfo}
              tooltoipClass={infoClass}
              tooltipPostion={infoPosition}
            />
          ) : (
            ""
          )}
          {titleStar ? <MandatoryStar /> : ""}
        </div>
      )}
      {children}
    </div>
  );
};

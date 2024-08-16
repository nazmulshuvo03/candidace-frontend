import { MandatoryStar } from "../../MandatoryStar";
import { getDataLabelFromKey } from "../../../utils/data";
import { Tooltip } from "../../Tooltip";
import { companyNameShortner } from "../../../utils/string";

export const TargetItem = ({
  title = "",
  value,
  valueArray,
  optionArray,
  star = false,
  size = "normal", // "normal", "big"
  tooltip = false,
}) => {
  return (
    <div
      className={`flex flex-wrap items-baseline gap-1 break-words ${
        size === "big" ? "text-sm font-medium" : "text-xs font-medium"
      }`}
    >
      {title} {star && <MandatoryStar />}:
      {value ? (
        <span className="font-normal">{value}</span>
      ) : valueArray && valueArray.length ? (
        valueArray.map((val, i) => {
          const label = getDataLabelFromKey(optionArray, val);
          const nextLabel = getDataLabelFromKey(optionArray, valueArray[i + 1]);
          return (
            <div
              key={val}
              className={`${
                size === "big" ? "font-medium" : "font-normal"
              } flex gap-1 items-baseline`}
            >
              {label ? (
                <Tooltip text={tooltip ? label : ""}>
                  {tooltip ? companyNameShortner(label, 1) : label}
                </Tooltip>
              ) : (
                <span className="-ml-2" />
              )}
              {nextLabel ? (
                <div
                  style={{
                    fontSize: 15,
                  }}
                >
                  &middot;
                </div>
              ) : (
                <span />
              )}
            </div>
          );
        })
      ) : (
        <div />
      )}
    </div>
  );
};

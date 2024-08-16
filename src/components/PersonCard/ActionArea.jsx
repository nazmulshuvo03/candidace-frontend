import { Button } from "../Button";
import { getDateDescription, timeDistance } from "../../utils/timeDate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAllTrue } from "../../utils/object";
import { Tooltip } from "../Tooltip";
import { AdditionalInfo } from "../Profile/Reviews/AdditionalInfo";
import { completionRemaining } from "../../utils/profile";
import moment from "moment";
import { setChat } from "../../store/slices/global";

export const ActionArea = ({
  data = null,
  onNextAvailableClick = () => {},
  handleClick = () => {},
}) => {
  const dispatch = useDispatch();
  const completionStatus = useSelector((state) => state.user.completionStatus);
  const [latest, setLatest] = useState();

  const lastPracticed = timeDistance(data.lastMeeting?.dayHourUTC);

  useEffect(() => {
    if (data && data.availabilities && data.availabilities.length) {
      let sorted = data.availabilities
        .filter((item) => item.state === "OPEN")
        .sort((a, b) => a.dayHour - b.dayHour);
      if (sorted && sorted.length) {
        setLatest(sorted[0]);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      <div>
        <AdditionalInfo reviews={data.reviews} />
      </div>
      <div className="flex flex-col md:flex-row gap-1 md:gap-3 items-center pt-2 md:pt-0">
        {data.lastMeeting ? (
          <div className="bg-transparent !text-green-600 text-xs !font-semibold uppercase !p-0">
            Last Practiced {lastPracticed}{" "}
            {lastPracticed !== "Today" && lastPracticed !== "Yesterday"
              ? "ago"
              : ""}
          </div>
        ) : (
          <div />
        )}
        <div className="flex gap-1 md:gap-3">
          <Button
            onClick={handleClick}
            size="small"
            className="bg-white !text-gray-700 !font-bold border border-gray-700 text-xs !py-1 !px-2"
          >
            Learn More
          </Button>
          {latest ? (
            <Button
              onClick={
                isAllTrue(completionStatus)
                  ? () => onNextAvailableClick(latest)
                  : () => {}
              }
              size="small"
              className={`${
                isAllTrue(completionStatus)
                  ? "!bg-secondary border-secondary"
                  : "!bg-gray-300 border-gray-700 !text-gray-700 !cursor-default"
              } border text-xs !md:w-fit !md:w-1/3 !py-1`}
            >
              <Tooltip
                text={
                  isAllTrue(completionStatus)
                    ? ""
                    : `Provide ${completionRemaining(
                        completionStatus
                      )} to complete profile`
                }
                className={"!whitespace-normal"}
              >
                Next Available {getDateDescription(latest.dayHour)}{" "}
                {moment(latest.dayHourUTC).format("hh:mm A")}
              </Tooltip>
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={() => dispatch(setChat(data))}
            size="small"
            className="bg-white !text-gray-700 !font-bold border border-gray-700 text-xs !py-1 !px-2"
          >
            Direct Message
          </Button>
        </div>
      </div>
    </div>
  );
};

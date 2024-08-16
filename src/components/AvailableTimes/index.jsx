import { useEffect } from "react";
import {
  convertLocalDayTimeToUTCDayTime,
  generateDateArray,
  generateHourArray,
} from "../../utils/timeDate";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAvailability,
  fetchUserAvailabilities,
} from "../../store/middlewares/availability";

export const AvailableTimes = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const userAvailabilities = useSelector(
    (state) => state.availability.userAvailabilities
  );

  const dateArray = generateDateArray();
  const hourArray = generateHourArray();

  const handleTimeSelect = (day, time) => {
    const data = {
      userId: profile.id,
      day: day.key,
      hour: time.id,
      dayHourUTC: convertLocalDayTimeToUTCDayTime(day.key, time.key),
    };
    dispatch(createUserAvailability(data));
  };

  useEffect(() => {
    dispatch(fetchUserAvailabilities(profile.id));
  }, []);

  return (
    <div className="p-2">
      <div className="text-center text-3xl font-semibold text-accent pb-3">
        Select the times you are available for next 3 days
      </div>
      <div>
        {dateArray && dateArray.length ? (
          dateArray.map((item, i) => {
            return (
              <div key={i} className="mb-3">
                <div className="py-2 text-text font-semibold text-xl">
                  {item.label}
                </div>
                <div className="flex gap-2 flex-wrap border border-primary rounded-md px-2 py-2">
                  {hourArray &&
                    hourArray.length &&
                    hourArray.map((hour) => {
                      const found =
                        userAvailabilities &&
                        typeof userAvailabilities !== "string" &&
                        userAvailabilities.find(
                          (avl) =>
                            avl.dayHourUTC ===
                            convertLocalDayTimeToUTCDayTime(item.key, hour.key)
                        );
                      return (
                        <div
                          key={hour.id}
                          className={`cursor-pointer border border-primary rounded-md py-1 px-2 
                        ${
                          found && found.state === "OPEN"
                            ? "bg-primary text-white"
                            : found && found.state === "BOOKED"
                            ? "bg-gray-500 text-white border-gray-500 cursor-not-allowed"
                            : "bg-background text-text"
                        }
                            `}
                          onClick={
                            !found || found.state !== "BOOKED"
                              ? () => handleTimeSelect(item, hour)
                              : () => {}
                          }
                        >
                          {hour.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button/IconButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { useSelector } from "react-redux";
import { CapsulList } from "../Capsul/CapsulList";
import moment from "moment";

export const BookSlot = ({
  data,
  selected,
  setSelected = () => {},
  handleClose = () => {},
  handleBook = () => {},
}) => {
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [dates, setDates] = useState();

  const groupedByDate = (data) =>
    data.availabilities.reduce((acc, obj) => {
      const date = new Date(obj.dayHourUTC).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(obj);
      return acc;
    }, {});

  useEffect(() => {
    if (data && data.availabilities) {
      const result = Object.values(groupedByDate(data));
      setDates(result);
    }
  }, [data]);

  return (
    <div className="p-4 pb-0 overflow-y-hidden h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-gray-400">
          Book Interview Slot
        </div>
        <IconButton onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-gray-700 text-lg" />
        </IconButton>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row pt-2 pb-4 ">
          <div className="flex-1">
            {dates && dates.length ? (
              <>
                {dates.map((date, i) => {
                  return (
                    <div key={i} className="py-2">
                      <div className="text-text text-base font-semibold pb-2">
                        {moment(date[0].dayHourUTC).format("MMM DD, dddd")}:
                      </div>
                      {date && date.length ? (
                        <div className="flex gap-2">
                          {date.map((hour) => (
                            <div
                              key={hour.id}
                              className={`${
                                hour.id === selected.id
                                  ? "cursor-pointer bg-secondary border border-secondary text-white"
                                  : hour.state === "BOOKED"
                                  ? "bg-gray-300 border border-gray-300"
                                  : "cursor-pointer bg-transparent border border-secondary"
                              } text-sm font-normal rounded-lg px-4 py-2`}
                              onClick={() =>
                                hour.state !== "BOOKED" && setSelected(hour)
                              }
                            >
                              {moment(hour.dayHourUTC).format("hh:mm A")}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div />
            )}
          </div>
          <div className="flex-1 border border-secondary p-2 rounded-md">
            <div className="text-center text-lg font-light">Slot Details</div>
            <div className="py-2">
              <div className="text-sm text-gray-400 pb-1">
                Practice Areas for this slot
              </div>
              <div className="py-1">
                <CapsulList data={selected.practiceAreas} labels={allSkill} />
              </div>
            </div>
            {selected.interviewNote ? (
              <div className="py-2">
                <div className="text-sm text-gray-400 pb-1">
                  Interview Note for this slot
                </div>
                <div className="text-sm font-medium pb-1 text-gray-600">
                  {selected.interviewNote}
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="text-center py-4">
          <Button size="small" className={"!bg-secondary"} onClick={handleBook}>
            Confirm Appoinment
          </Button>
        </div>
      </div>
    </div>
  );
};

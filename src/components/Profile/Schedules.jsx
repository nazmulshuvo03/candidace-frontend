import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteAvailability,
  fetchUserAvailabilities,
} from "../../store/middlewares/availability";
import { CapsulList } from "../Capsul/CapsulList";
import { ProfileBlock } from "../Layouts/ProfileBlock";
import { NoData } from "../NoData";
import { Tooltip } from "../Tooltip";
import moment from "moment";
import { useEffect } from "react";

export const Schedules = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const availabilities = useSelector(
    (state) => state.availability.userAvailabilities
  );
  const allSkill = useSelector((state) => state.profession.allSkill);

  useEffect(() => {
    if (profile) dispatch(fetchUserAvailabilities(profile.id));
  }, [profile]);

  const handleDelete = (values) => {
    dispatch(deleteAvailability(values));
  };

  return (
    <ProfileBlock title="Schedules" className="!bg-primary !h-auto">
      <div className="h-full">
        {availabilities && availabilities.length ? (
          <div>
            {availabilities.map((avl) => {
              return (
                <div
                  key={avl.id}
                  className="py-2 px-2 bg-white my-2 rounded-md shadow-sm"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline justify-start">
                      <div className="text-base font-light text-gray-700">
                        {moment(avl.dayHourUTC).format("MMM DD, ddd, hh:mm A")}
                      </div>
                      {avl.isRecurring && (
                        <Tooltip text="This user will be available next week this day same time">
                          <div className="cursor-default px-1 py-1 font-normal text-xs text-gray-400">
                            (Recurring)
                          </div>
                        </Tooltip>
                      )}
                      <div
                        className={`px-1 py-1 font-normal text-xs ${
                          avl.state === "COMPLETED"
                            ? "text-red-400"
                            : avl.state === "BOOKED"
                            ? "text-green-400"
                            : "text-blue-500"
                        }`}
                      >
                        {avl.state}
                      </div>
                    </div>
                    <div className="">
                      <Button
                        onClick={() => handleDelete(avl)}
                        className={
                          "!bg-transparent !text-red-500 !text-sm !p-0"
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>
                  <div className="py-1">
                    <CapsulList data={avl.practiceAreas} labels={allSkill} />
                  </div>
                  {avl.interviewNote && (
                    <div className="my-1 py-1 max-h-40 overflow-y-auto text-xs">
                      {avl.interviewNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-2/3">
            <NoData
              image={1}
              message="You have not scheduled any interview yet"
            />
          </div>
        )}
      </div>
    </ProfileBlock>
  );
};

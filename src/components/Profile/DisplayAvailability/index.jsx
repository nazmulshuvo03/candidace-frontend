import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../../Button/IconButton";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "../../Modal";
import { CreateMeeting } from "./CreateMeeting";
import { useSelector } from "react-redux";
import { isAllTrue } from "../../../utils/object";
import { CapsulList } from "../../Capsul/CapsulList";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { NoData } from "../../NoData";
import moment from "moment";
import { Tooltip } from "../../Tooltip";

export const DisplayAvailability = () => {
  const user = useSelector((state) => state.user.profile);
  const profile = useSelector((state) => state.user.visitingProfile);
  const completionStatus = useSelector((state) => state.user.completionStatus);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [selectedAvailability, setSelectedAvailability] = useState(false);

  const handleCancel = () => {
    setSelectedAvailability();
  };

  return (
    <ProfileBlock title="Availabilities">
      <div className="py-2">
        {profile.availabilities && profile.availabilities.length ? (
          <>
            {profile.availabilities.map((avl) => {
              return (
                <div key={avl.id} className="py-1">
                  <div className="flex items-baseline">
                    <div className="text-sm font-normal text-gray-500">
                      {moment(avl.dayHourUTC).format("MMM DD, ddd, hh:mm A")}
                    </div>
                    <div
                      className={`flex-1 px-2 py-1 font-semibold text-xs ${
                        avl.state === "COMPLETED"
                          ? "text-red-400"
                          : avl.state === "BOOKED"
                          ? "text-blue-400"
                          : "text-green-500"
                      }`}
                    >
                      {avl.state}
                    </div>
                    <div className="">
                      {avl.state === "OPEN" ? (
                        <Tooltip
                          text={
                            !user
                              ? "Please login to create meeting"
                              : !(
                                  completionStatus &&
                                  isAllTrue(completionStatus)
                                )
                              ? "Please complete your profile"
                              : ""
                          }
                          className={"!whitespace-normal"}
                        >
                          <IconButton
                            onClick={
                              user &&
                              completionStatus &&
                              isAllTrue(completionStatus)
                                ? () => setSelectedAvailability(avl)
                                : () => {}
                            }
                          >
                            <FontAwesomeIcon
                              icon={faCalendarPlus}
                              className={`${
                                user &&
                                completionStatus &&
                                isAllTrue(completionStatus)
                                  ? "text-secondary"
                                  : "text-gray-400 cursor-default"
                              }`}
                            />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                  <div className="py-1">
                    <CapsulList data={avl.practiceAreas} labels={allSkill} />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <NoData image={1} message={"No Available Time Provided"} />
        )}
      </div>
      {selectedAvailability && (
        <Modal>
          <CreateMeeting
            profile={profile}
            data={selectedAvailability}
            handleCancel={handleCancel}
          />
        </Modal>
      )}
    </ProfileBlock>
  );
};

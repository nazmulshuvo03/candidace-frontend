import { useSelector } from "react-redux";
import {
  COMPLETION_DETAILS,
  COMPLETION_ITEMS,
} from "../../../constants/Profile";
import { Checkbox } from "../../Checkbox";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { useEffect, useState } from "react";

export const CompletionChecklist = () => {
  const [status, setStatus] = useState();

  const completionStatus = useSelector((state) => state.user.completionStatus);

  useEffect(() => {
    if (completionStatus) {
      setStatus(completionStatus);
    }
  }, [completionStatus]);

  return (
    <ProfileBlock
      title="Profile Status"
      titleInfo={"Complete all of the following steps to be visible to others"}
      infoClass={"!whitespace-normal"}
      infoPosition="right"
    >
      <div className="h-full px-2">
        {status &&
          Object.keys(COMPLETION_ITEMS).map((key) => (
            <div key={key} className="flex gap-3 items-start my-5">
              <div>
                <Checkbox checked={status[key]} round={true} />
              </div>
              <div>
                <div className="text-lg font-medium mb-3">
                  {COMPLETION_ITEMS[key]}
                </div>
                <div className="text-sm font-normal">
                  {COMPLETION_DETAILS[key]}
                </div>
              </div>
            </div>
          ))}
      </div>
    </ProfileBlock>
  );
};

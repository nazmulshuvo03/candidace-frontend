import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button";
import { createMeeting } from "../../../store/middlewares/meeting";
import { getDataLabelFromKey } from "../../../utils/data";
import moment from "moment";

export const CreateMeeting = ({ profile, data, handleCancel = () => {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const handleConfirm = async () => {
    const payload = {
      availabilityId: data.id,
      acceptorId: user.id,
      initiatorId: profile.id,
    };
    await dispatch(createMeeting(payload, "visit"));
    handleCancel();
  };

  return (
    <div className="p-6">
      <div className="text-lg text-gray-500 pb-4 text-center">
        Are you sure?
      </div>
      <div className="py-1">
        <div className="text-xs text-gray-500">Interview Time</div>
        <div className="text-base text-text font-medium pb-1">
          {moment(data.dayHourUTC).format("MMM DD, dddd, hh:mm A")}
        </div>
      </div>
      <div className="py-1">
        <div className="text-xs text-gray-500">Practice Areas</div>
        <div className="flex gap-1">
          {data.practiceAreas && data.practiceAreas.length ? (
            data.practiceAreas.map((focus, i) => {
              return (
                <div key={focus}>
                  <span className="bg-gray-200 text-gray-600 px-4 py-0 rounded-full">
                    {getDataLabelFromKey(allSkill, focus)}
                  </span>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
      {data.interviewNote ? (
        <div className="py-1">
          <div className="text-xs text-gray-500">Interview Note</div>
          <div className="text-base text-text font-medium pb-1">
            {data.interviewNote}
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className="py-1">
        <div className="text-xs text-gray-500">With</div>
        <div className="text-base text-text font-medium pb-1">
          {profile.userName}
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button size="small" className={"!bg-red-400"} onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="small" className={"bg-green-400"} onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

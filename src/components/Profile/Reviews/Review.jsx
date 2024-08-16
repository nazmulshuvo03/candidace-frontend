import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { companyNameShortner } from "../../../utils/string";
import { Stars } from "../../Stars";
import moment from "moment";

export const Review = ({ data, visit }) => {
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="flex gap-3 bg-white p-2 rounded my-2">
      <img
        src={data.reviewerProfile.photoURL}
        alt="Reviewer Image"
        className="h-16 w-16"
      />
      <div>
        <div className="mb-2">
          <div className="font-bold text-lg">
            {data.reviewerProfile.userName}
          </div>
          <div className="flex gap-1">
            {data.reviewerProfile.workExperiences &&
              data.reviewerProfile.workExperiences.length && (
                <div className="text-xs text-gray-700 font-light">
                  {data.reviewerProfile.workExperiences[0].jobTitle}
                  {","}
                </div>
              )}
            {data.reviewerProfile.workExperiences &&
              data.reviewerProfile.workExperiences.length && (
                <div className="text-xs text-gray-700 font-light">
                  {companyNameShortner(
                    getDataLabelFromKey(
                      companies,
                      data.reviewerProfile.workExperiences[0].companyId
                    ),
                    2
                  )}
                </div>
              )}
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          <span>Interview Date: </span>
          <span>
            {moment(data.meeting.dayHourUTC).format("MMM DD, ddd, YYYY")}
          </span>
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Punctuality:{" "}
          <Stars size="small" color="blue" value={data.punctuality} />
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Preparedness:{" "}
          <Stars size="small" color="blue" value={data.preparedness} />
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Feedback:{" "}
          <Stars size="small" color="blue" value={data.depthOfFeedback} />
        </div>
      </div>
    </div>
  );
};

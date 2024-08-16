import { useSelector } from "react-redux";
import { timeDistance } from "../../../../utils/timeDate";
import { getDataLabelFromKey } from "../../../../utils/data";
import moment from "moment";

export const Work = ({ data }) => {
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const companies = useSelector((state) => state.static.companies);

  return (
    <div>
      <div
        className="border-l-2 border-gray-200 absolute"
        style={{ height: "100%", top: 10, left: -2 }}
      />
      <div
        className="text-gray-300 absolute"
        style={{ fontSize: 30, top: -11, left: -5 }}
      >
        &middot;
      </div>
      <div className="flex items-center justify-between text-md font-semibold">
        {getDataLabelFromKey(companies, data.companyId)}
      </div>
      <div className="flex gap-1 items-center text-sm font-medium">
        <span>{data.jobTitle}</span>
        <span style={{ fontSize: 20 }}>&middot;</span>
        <span className="italic">
          {getDataLabelFromKey(experienceLevels, data.experienceId)}
        </span>
      </div>
      <div className="text-sm font-medium text-gray-500">{data.country}</div>
      <div className="flex gap-1 items-center text-xs font-normal text-gray-500">
        <span>
          {moment(data.startDate).format("MMM DD, YYYY")}
          {" - "}
          {data.endDate
            ? moment(data.endDate).format("MMM DD, YYYY")
            : "Present"}
        </span>
        <span style={{ fontSize: 20 }}>&middot;</span>
        <span>{timeDistance(data.startDate, data.endDate)}</span>
      </div>
    </div>
  );
};

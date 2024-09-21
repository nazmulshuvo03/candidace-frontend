import moment from "moment";
import { Button } from "../Button";
import { useSelector } from "react-redux";

export const JobCard = ({ data }) => {
  const global = useSelector((state) => state.global);

  return (
    <div className={"w-full my-3 bg-white shadow-lg rounded-md px-8 py-4"}>
      <div className="flex gap-4">
        <div className="w-fit h-fit">
          <img
            src={data.imageUrl}
            alt={data.jobTitle}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg text-text">{data.jobTitle}</div>
          <div className="font-normal text-gray-500 text-md">
            {data.companyName}
          </div>
          {global?.isAdmin && (
            <div className="text-xs font-bold">{data.source}</div>
          )}
        </div>
        <div className="flex flex-col justify-start items-end gap-2">
          <Button
            className={
              "!border-2 !border-secondary !rounded-md !bg-white !text-secondary"
            }
            onClick={() => {
              window.open(data.applyUrl, "_blank");
            }}
          >
            Apply
          </Button>
          <div className="text-gray-500 text-xs font-bold">
            {moment(data.datePosted).fromNow()}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 pt-4 justify-end">
        {data?.location?.map((item, i) => (
          <div
            key={i}
            className="border border-gray-500 px-4 py-1 rounded-full text-xs text-gray-400"
          >
            {item}
          </div>
        ))}
        {data?.tags?.map((item, j) => (
          <div
            key={j}
            className="border border-gray-500 px-4 py-1 rounded-full text-xs text-gray-400"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

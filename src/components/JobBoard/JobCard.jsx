import { Button } from "../Button";

export const JobCard = ({ data }) => {
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
        </div>
        <div className="flex items-start">
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

import { JobCard } from "./JobCard";

export default function JobBoard({ data }) {
  // console.log("@@@@@@@@@@@@", data);
  return (
    <div className="w-full p-6">
      {data && data.length ? (
        <div>
          {data.map((item) => {
            return <JobCard key={item.id} data={item} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export const ImageArea = ({ data = null, handleProfileVisit }) => {
  return (
    <div
      className="flex flex-col items-start md:items-center justify-center py-2 cursor-pointer"
      onClick={handleProfileVisit}
    >
      <img
        src={data.photoURL}
        alt={"Person Profile Image"}
        className="h-28 w-28 rounded-md"
      />
      <div className="flex gap-2 font-semibold text-lg ml-4 md:ml-0">
        <span>{data.userName}</span>
      </div>
      <div className="text-xs font-light text-gray-600 ml-4 md:ml-0">
        {data.country}
      </div>
    </div>
  );
};

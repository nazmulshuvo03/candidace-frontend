export const Education = ({ data }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
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
          <div className="flex items-center justify-between text-sm font-semibold">
            {data.institution}
          </div>
          <div className="flex gap-2 items-center text-sm">
            <div className="font-medium">
              {data.degree}
              {" in "}
              {data.major}
            </div>
            <div style={{ fontSize: 20 }}>&middot;</div>
            <div className="font-normal">{data.year_of_graduation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

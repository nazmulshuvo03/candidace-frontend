import { useSelector } from "react-redux";

export const Interview = ({ data }) => {
  const professions = useSelector((state) => state.profession.items);
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
      <div className="flex items-center justify-between text-sm font-semibold">
        <div>{professions.find((prf) => prf.id === data.role)?.name}</div>
      </div>
      <div className="text-sm font-medium">
        {companies &&
          companies.length &&
          companies.filter(
            (company) => company.id === parseInt(data.companyId)
          )[0]?.name}
        {data.country ? ", " : ""}
        {data.country}
      </div>
    </div>
  );
};

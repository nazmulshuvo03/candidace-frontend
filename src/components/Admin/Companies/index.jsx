import { useDispatch, useSelector } from "react-redux";
import { NoData } from "../../NoData";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useEffect, useState } from "react";
import { addCompany } from "../../../store/middlewares/static";

export const CompaniesAdmin = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.static.companies);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (query && query.length) {
      setFilteredData(() =>
        companies.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredData(companies);
  }, [query, companies]);

  const addNewCompany = () => {
    if (query) {
      dispatch(
        addCompany({
          name: query,
        })
      );
    }
    setQuery("");
    setFilteredData(companies);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          className=""
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={addNewCompany} className={"!rounded-md"}>
          Add Company
        </Button>
      </div>
      <div style={{ height: "70vh", overflowY: "auto" }}>
        {filteredData && filteredData.length ? (
          <>
            {filteredData.map((company) => (
              <div key={company.id} className="flex gap-2 my-1 rounded text-xs">
                <div className="text-gray-500">{company.id}</div>
                <div className="font-semibold">{company.name}</div>
              </div>
            ))}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

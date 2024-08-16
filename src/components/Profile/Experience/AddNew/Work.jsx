import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "../../../Dropdown";
import { Input } from "../../../Input";
import { addAndGetCompany } from "../../../../store/middlewares/static";
import { DateInput } from "../../../Input/DateInput";
import { Checkbox } from "../../../Checkbox";

export const Work = ({ data, handleChange = () => {} }) => {
  const dispatch = useDispatch();
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const companies = useSelector((state) => state.static.companies);
  const { jobTitle, experienceId, companyId, country, startDate, endDate } =
    data;

  const [current, setCurrent] = useState(false);

  const handleAddNewCompany = async (data) => {
    const res = await dispatch(addAndGetCompany(data));
    return res;
  };

  return (
    <>
      <div className="grid md:grid-cols-3 items-baseline justify-between gap-4">
        <Dropdown
          label="Company *"
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          defaultText="Company"
          allowAddNew={true}
          addNewAction={handleAddNewCompany}
        />
        <DateInput
          label={"From *"}
          value={startDate || ""}
          onChange={(value) => {
            handleChange({
              target: {
                name: "startDate",
                value,
              },
            });
          }}
          maxDate={new Date()}
        />
        <div className="flex justify-center items-center gap-3">
          <div className="w-full">
            <DateInput
              label={"To"}
              value={endDate || ""}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "endDate",
                    value,
                  },
                });
              }}
              minDate={startDate}
              maxDate={new Date()}
              disabled={current}
            />
          </div>
          <Checkbox
            label="Present"
            checked={current}
            setChecked={() => setCurrent((prev) => !prev)}
            className="w-auto"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          label="Role *"
          name="jobTitle"
          value={jobTitle || ""}
          onChange={handleChange}
        />
        <Dropdown
          label="Experience Level *"
          name={"experienceId"}
          value={experienceId || ""}
          options={experienceLevels}
          onSelect={handleChange}
          defaultText="Experience Level"
        />
        <Input
          label="Country"
          name="country"
          value={country}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

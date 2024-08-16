import { useSelector } from "react-redux";
import { Dropdown } from "../Dropdown";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";

export const Experience = ({
  educationData,
  setEducationData,
  workData,
  setWorkData,
  targetState,
  setTargetState,
}) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  const handleEducationChange = (event) => {
    const { name, value } = event.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkChange = (event) => {
    const { name, value } = event.target;
    setWorkData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="py-4">
        <div>Most Recent Educational Degree</div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <Input
              label="Degree"
              name="degree"
              value={educationData.degree}
              onChange={handleEducationChange}
            />
            <Input
              label="Major"
              name="major"
              value={educationData.major}
              onChange={handleEducationChange}
            />
          </div>
          <Input
            label="Institution"
            name="institution"
            value={educationData.institution}
            onChange={handleEducationChange}
          />
          <Input
            label="Year of Graduation"
            name="year_of_graduation"
            value={educationData.year_of_graduation}
            onChange={handleEducationChange}
          />
        </div>
      </div>
      <div className="py-4">
        <div>Most Recent Work Experience</div>
        <div className="flex flex-col gap-2">
          <Dropdown
            name={"jobTitle"}
            value={workData.jobTitle || ""}
            options={professions}
            onSelect={handleWorkChange}
            label="Job Title"
          />
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              name={"companyId"}
              value={workData.companyId || ""}
              options={companies}
              onSelect={handleWorkChange}
              label="Company"
            />
            <Input
              label="Country"
              name="country"
              value={workData.country}
              onChange={handleWorkChange}
            />
            <Input
              type="date"
              label="Start Date"
              name="startDate"
              value={workData.startDate || ""}
              onChange={handleWorkChange}
            />
            <Input
              type="date"
              label="End Date"
              name="endDate"
              value={workData.endDate || ""}
              onChange={handleWorkChange}
            />
          </div>
        </div>
      </div>
      <div className="py-4">
        <div>Additional Information</div>
        <Dropdown
          name={"targetProfessionId"}
          value={targetState.targetProfessionId || ""}
          options={professions}
          onSelect={(e) =>
            setTargetState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          label="Role of Interest"
        />
      </div>
    </div>
  );
};

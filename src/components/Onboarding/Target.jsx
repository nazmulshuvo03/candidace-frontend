import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "../Dropdown";
import { MultiInputDropdown } from "../Dropdown/MultiInputDropdown";

export const Target = ({ state, setState }) => {
  const professions = useSelector((state) => state.profession.items);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const companies = useSelector((state) => state.static.companies);
  const [skillOptions, setSkillOptions] = useState([]);
  const [expTypsOptions, setExpTypsOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    if (professions && professions.length && state.targetProfessionId) {
      const selectedProfession = professions.filter(
        (option) => option.id === state.targetProfessionId
      )[0];
      if (selectedProfession) {
        setSkillOptions(selectedProfession.skills);
        setExpTypsOptions(selectedProfession.experienceTypes);
      }
    }
  }, [professions, state.targetProfessionId]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-base font-semibold">Role Preference</div>
          <div className="text-sm font-normal text-gray-500">
            Level of jobs you are or will be applying to.
          </div>
        </div>
        <Dropdown
          // label={"Target Level"}
          name={"experienceLevel"}
          value={state.experienceLevel || ""}
          options={experienceLevels}
          onSelect={handleChange}
          defaultText="Select an option"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-base font-semibold">Areas of Interest</div>
          <div className="text-sm font-normal text-gray-500">
            Type of interview prep you wish to practice with Candidace.fyi.
            Select all that apply.
          </div>
        </div>
        <MultiInputDropdown
          // label="Focus Areas"
          name="focusAreas"
          value={state.focusAreas}
          options={skillOptions}
          onSelect={handleChange}
          defaultText={"Select upto 5"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-base font-semibold">Types of Experiences</div>
          <div className="text-sm font-normal text-gray-500">
            Type of interview prep you wish to practice with Candidace.fyi.
            Select all that apply.
          </div>
        </div>
        <MultiInputDropdown
          // label="Types of Experience"
          name="typesOfExperience"
          value={state.typesOfExperience}
          options={expTypsOptions}
          onSelect={handleChange}
          defaultText={"Select upto 5"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-base font-semibold">Target Companies</div>
          <div className="text-sm font-normal text-gray-500">
            Choose upto 4 companies.
          </div>
        </div>
        <MultiInputDropdown
          // label="Company Names"
          name="companiesOfInterest"
          value={state.companiesOfInterest}
          options={companies}
          onSelect={handleChange}
          defaultText={"Select upto 5"}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-base font-semibold">
            Current Stage of Interview Prep
          </div>
        </div>
        <Dropdown
          label={"What describes your current job search status?"}
          name={"preparationStage"}
          value={state.preparationStage || ""}
          options={preparationStages}
          onSelect={handleChange}
          defaultText="Select an option"
        />
      </div>
    </div>
  );
};

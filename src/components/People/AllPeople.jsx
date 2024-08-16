import { useSelector } from "react-redux";
import { PersonCard } from "../../components/PersonCard";
import { Dropdown } from "../../components/Dropdown";
import { NoData } from "../NoData";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
// import { RangeSlider } from "../../components/Slider/RangeSlider";

// const EXPERIENCE_MIN_VALUE = 0;
// const EXPERIENCE_MAX_VALUE = 20;

export const AllPeople = ({
  queries = {},
  handleQuerySelect = () => {},
  showFilters = true,
  setShowFilters = () => {},
  showFilterToggle = false,
  // minExp = EXPERIENCE_MIN_VALUE,
  // maxExp = EXPERIENCE_MAX_VALUE,
  // handleExperienceSelect = () => {},
}) => {
  const people = useSelector((state) => state.user.people);
  const targetProfession = useSelector(
    (state) => state.profession.targetProfession
  );
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  return (
    <div className="py-2 flex flex-col h-full">
      <div className="grid grid-cols-2 md:grid-cols-8 gap-2 pb-4">
        <Dropdown
          name={"companiesOfInterest"}
          value={queries["companiesOfInterest"] || ""}
          options={companies}
          onSelect={handleQuerySelect}
          defaultText={"Company"}
          allowSearch={false}
        />
        {showFilters && (
          <>
            <Dropdown
              name={"focusAreas"}
              value={queries["focusAreas"] || ""}
              options={targetProfession ? targetProfession.skills : null}
              onSelect={handleQuerySelect}
              defaultText={"Interests"}
              allowSearch={false}
            />
            <Dropdown
              name={"typesOfExperience"}
              value={queries["typesOfExperience"] || ""}
              options={
                targetProfession ? targetProfession.experienceTypes : null
              }
              onSelect={handleQuerySelect}
              defaultText={"Experience"}
              allowSearch={false}
            />
            <Dropdown
              name={"experienceLevel"}
              value={queries["experienceLevel"] || ""}
              options={experienceLevels}
              onSelect={handleQuerySelect}
              defaultText={"Target Level"}
              allowSearch={false}
            />
            <Dropdown
              name={"preparationStage"}
              value={queries["preparationStage"] || ""}
              options={preparationStages}
              onSelect={handleQuerySelect}
              defaultText={"Status"}
              allowSearch={false}
            />
          </>
        )}
        {showFilterToggle && (
          <div className="flex h-full items-center justify-end">
            <IconButton
              className={"h-8 !w-8 !bg-white !rounded-full shadow"}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FontAwesomeIcon
                className="text-text"
                icon={showFilters ? faAnglesUp : faAnglesDown}
              />
            </IconButton>
          </div>
        )}
      </div>
      {/* <div className="w-60">
        <RangeSlider
          label="Filter by years of experience"
          lowerValue={minExp}
          upperValue={maxExp}
          handleChange={handleExperienceSelect}
          min={EXPERIENCE_MIN_VALUE}
          max={EXPERIENCE_MAX_VALUE}
        />
      </div> */}
      <div className="flex-1 overflow-y-auto">
        {people && people.length && typeof people !== "string" ? (
          <div className="grid grid-cols-1 gap-4">
            {people.map((person) => (
              <PersonCard key={person.id} data={person} />
            ))}
          </div>
        ) : (
          <NoData
            message="Oops! No matches found. Change filters and try again."
            image={1}
            fontClassName={"font-semibold"}
          />
        )}
      </div>
    </div>
  );
};

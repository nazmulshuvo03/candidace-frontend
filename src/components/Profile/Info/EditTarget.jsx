import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { TextInput } from "../../TextInput";
import { MultiInputDropdown } from "../../Dropdown/MultiInputDropdown";
import COUNTRY_DATA from "../../../assets/data/countries.json";
import { updateUserData } from "../../../store/middlewares/user";
import { addAndGetCompany } from "../../../store/middlewares/static";
import { Input } from "../../Input";
import { IconButton } from "../../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const EditTarget = ({
  handleDone = () => {},
  handleClose = () => {},
}) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector((state) => state.profession.items);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const companies = useSelector((state) => state.static.companies);
  const [skillOptions, setSkillOptions] = useState();
  const [expTypsOptions, setExpTypsOptions] = useState();

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    linkedInProfile: "",
    profileHeadline: "",
    country: "",
    language: "",
    targetProfessionId: null,
    focusAreas: [],
    typesOfExperience: [],
    experienceLevel: null,
    preparationStage: null,
    companiesOfInterest: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUserData(profile.id, state));
    handleDone();
  };

  const handleAddNewCompany = async (data) => {
    const response = await dispatch(addAndGetCompany(data));
    return response;
  };

  const updateStateFromProfile = (currentState, profileData) => {
    return Object.keys(currentState).reduce((updatedState, key) => {
      updatedState[key] = profileData[key] || currentState[key];
      return updatedState;
    }, {});
  };

  useEffect(() => {
    if (profile) {
      const updatedState = updateStateFromProfile(state, profile);
      setState(updatedState);
    }
  }, [profile]);

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
    <div className="px-3 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between pb-2 md:pb-4">
        <div className="text-lg font-semibold uppercase">Edit Profile</div>
        <IconButton onClick={handleClose}>
          <FontAwesomeIcon icon={faClose} className="text-gray-500 text-2xl" />
        </IconButton>
      </div>
      <form
        className="py-6 flex flex-col md:grid md:grid-cols-2 gap-4"
        onSubmit={handleSave}
      >
        <Input
          label={"First Name"}
          name={"firstName"}
          value={state.firstName}
          onChange={handleChange}
        />
        <Input
          label={"Last Name"}
          name={"lastName"}
          value={state.lastName}
          onChange={handleChange}
        />
        <div className="md:col-span-2">
          <MultiInputDropdown
            label="Target Companies"
            name="companiesOfInterest"
            value={state.companiesOfInterest}
            options={companies}
            onSelect={handleChange}
            defaultText={"Select upto 5"}
            allowAddNew={true}
            addNewAction={handleAddNewCompany}
            max={5}
          />
        </div>
        <MultiInputDropdown
          label="Focus Areas"
          name="focusAreas"
          value={state.focusAreas}
          options={skillOptions}
          onSelect={handleChange}
          defaultText={"Select upto 5"}
          max={5}
        />
        <MultiInputDropdown
          label="Types of Experience"
          name="typesOfExperience"
          value={state.typesOfExperience}
          options={expTypsOptions}
          onSelect={handleChange}
          defaultText={"Select upto 5"}
          max={5}
        />
        <Dropdown
          label={"Target Level"}
          name={"experienceLevel"}
          value={state.experienceLevel || ""}
          options={experienceLevels}
          onSelect={handleChange}
          defaultText="Select an option"
        />
        <Dropdown
          label={"Stage of Interviewing"}
          name={"preparationStage"}
          value={state.preparationStage || ""}
          options={preparationStages}
          onSelect={handleChange}
          defaultText="Select an option"
        />
        <Dropdown
          label="Country"
          name={"country"}
          value={state.country}
          options={COUNTRY_DATA}
          onSelect={handleChange}
          defaultText="Select an option"
        />
        <Input
          label={"LinkedIn Profile"}
          name={"linkedInProfile"}
          value={state.linkedInProfile}
          onChange={handleChange}
        />
        <div className="col-span-2">
          <TextInput
            label="Profile Headline"
            name={"profileHeadline"}
            placeholder={"Write the headline of your profile"}
            rows="4"
            value={state.profileHeadline}
            setValue={handleChange}
          />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <Button size="small" className={"!bg-secondary"} onClick={handleSave}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

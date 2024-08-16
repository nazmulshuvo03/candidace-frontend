import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Experience } from "./Experience";
import { Target } from "./Target";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { addEducation } from "../../store/middlewares/education";
import { addWorkExperience } from "../../store/middlewares/workExperience";
import { updateUserData } from "../../store/middlewares/user";
import { formatPostgresDate } from "../../utils/timeDate";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const Onboarding = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [currentStep, setCurrentStep] = useState(0);
  const [educationData, setEducationData] = useState({
    degree: "",
    major: "",
    institution: "",
    year_of_graduation: "",
  });
  const [workData, setWorkData] = useState({
    jobTitle: null,
    companyId: null,
    country: "",
    startDate: null,
    endDate: null,
  });

  const [targetState, setTargetState] = useState({
    targetProfessionId: null,
    focusAreas: [],
    typesOfExperience: [],
    experienceLevel: null,
    preparationStage: null,
    companiesOfInterest: [],
  });

  const onBackClick = () =>
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));

  const onContinueClick = () => {
    setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
  };

  const onSubmitClick = async () => {
    const fullEducation = {
      ...educationData,
      user_id: profile.id,
    };
    const fullWorkExp = {
      user_id: profile.id,
      professionId: workData.jobTitle,
      companyId: workData.companyId,
      country: workData.country,
      startDate: formatPostgresDate(workData.startDate),
      endDate: formatPostgresDate(workData.endDate),
    };
    await dispatch(addEducation(fullEducation));
    await dispatch(addWorkExperience(fullWorkExp));
    await dispatch(updateUserData(profile.id, targetState));
    history.push("/profile");
  };

  console.log("@@@@@@", educationData, workData, targetState);

  const STEPS = [
    {
      id: 1,
      name: "Education & Work Experience",
      component: (
        <Experience
          {...{
            educationData,
            setEducationData,
            workData,
            setWorkData,
            targetState,
            setTargetState,
          }}
        />
      ),
    },
    {
      id: 2,
      name: "Job Preference",
      component: <Target state={targetState} setState={setTargetState} />,
    },
  ];

  return (
    <div className="px-10 py-2 h-full flex justify-center overflow-hidden">
      <div className="w-fit px-4 bg-white h-full overflow-y-auto">
        <div className="flex gap-3 items-center text-xs text-gray-400 font-light">
          <span>Sign Up</span>
          <FontAwesomeIcon icon={faChevronRight} />
          {STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => setCurrentStep(step.id - 1)}
              className="cursor-pointer flex gap-3 items-center"
            >
              <span
                className={
                  step.id === currentStep + 1
                    ? "text-secondary font-medium"
                    : ""
                }
              >
                {step.name}
              </span>
              {step.id < STEPS.length && (
                <FontAwesomeIcon icon={faChevronRight} />
              )}
            </div>
          ))}
        </div>
        <div className="">
          <div className="w-full text-center pt-4 pb-8">
            <div className="text-2xl font-semibold text-text">
              Tell us something more about yourself
            </div>
            <div className="text-sm font-medium text-gray-500 py-2">
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>
          <div>{STEPS[currentStep].component}</div>
          <div className="flex justify-between py-4">
            <Button
              size="small"
              className={
                "!bg-transparent border !border-gray-500 !text-gray-500"
              }
              onClick={onBackClick}
            >
              Go back
            </Button>
            {currentStep === STEPS.length - 1 ? (
              <Button
                size="small"
                className={"!bg-secondary"}
                onClick={onSubmitClick}
              >
                Submit
              </Button>
            ) : (
              <Button
                size="small"
                className={"!bg-secondary"}
                onClick={onContinueClick}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { generateHourArray } from "../../../utils/timeDate";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecurrentAvailability,
  deleteRecurrentAvailability,
  fetchRecurrentAvailabilities,
} from "../../../store/middlewares/availability";
import { Dropdown } from "../../Dropdown";
import { Button } from "../../Button";
import { MultiInputDropdown } from "../../Dropdown/MultiInputDropdown";
import { TextInput } from "../../TextInput";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { RecurrentItem } from "./RecurrentItem";

const dayIndexes = [
  { name: "Sun", id: 0 },
  { name: "Mon", id: 1 },
  { name: "Tue", id: 2 },
  { name: "Wed", id: 3 },
  { name: "Thu", id: 4 },
  { name: "Fri", id: 5 },
  { name: "Sat", id: 6 },
];

const hourIndexes = generateHourArray();

export const Recurrent = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const recurrentAvailabilities = useSelector(
    (state) => state.availability.recurrentAvailabilities
  );
  const professions = useSelector(
    (state) => state.profession.targetProfession.skills
  );
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [selectedDay, setSelectedDay] = useState(0);
  const [time, setTime] = useState();
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState();
  const [interviewNote, setInterviewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleAdd = () => {
    if (!time) {
      setErrorMessage("Please select time");
      return;
    }
    if (!selectedPracticeAreas || !selectedPracticeAreas.length) {
      setErrorMessage(
        "Please select at least one Practice area for this interview"
      );
      return;
    }
    const data = {
      weekday: selectedDay,
      hour: time - 1,
      practiceAreas: selectedPracticeAreas,
      interviewNote: interviewNote,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    dispatch(createRecurrentAvailability(data));
    setTime();
    setInterviewNote("");
  };

  const handleDelete = (data) => {
    dispatch(deleteRecurrentAvailability(data));
  };

  const handlePracticeAreaSelection = (e) => {
    setSelectedPracticeAreas(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchRecurrentAvailabilities());
  }, []);

  useEffect(() => {
    if (profile) setSelectedPracticeAreas(profile.focusAreas);
  }, [profile]);

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <ProfileBlock
      title={`Recurring Availability`}
      titleStar={!completionStatus.availabilities}
      titleInfo="Availabilities set here will be re-added to your schedules every 1st day of the week"
    >
      <div className="p-2">
        {recurrentAvailabilities && recurrentAvailabilities.length ? (
          <div className="w-full pb-2">
            <label className="text-xs">Already Added</label>
            <div className="flex gap-2 flex-wrap w-full">
              {recurrentAvailabilities.map((avl) => {
                return (
                  <RecurrentItem
                    key={avl.id}
                    data={avl}
                    dayIndexes={dayIndexes}
                    hourIndexes={hourIndexes}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div />
        )}
        <div className="flex flex-col gap-1">
          <div>
            <label className="text-xs">Weekday</label>
            <div className="flex gap-2 flex-wrap">
              {dayIndexes.map((day) => (
                <div
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`${
                    selectedDay === day.id
                      ? "text-secondary cursor-default"
                      : "text-gray-400 cursor-pointer"
                  } text-sm md:text-lg font-medium`}
                >
                  {day.name}
                </div>
              ))}
            </div>
          </div>
          <Dropdown
            label="Time"
            name="time"
            value={time || ""}
            options={hourIndexes}
            onSelect={(e) => setTime(e.target.value)}
            defaultText="Time"
            allowSearch={false}
          />
          <MultiInputDropdown
            label="Practice Areas*"
            name="practiceAreas"
            value={selectedPracticeAreas}
            options={professions}
            onSelect={handlePracticeAreaSelection}
            defaultText={"Select upto 5"}
            size="small"
          />
          <TextInput
            label="Interview Note"
            name={"interviewNote"}
            placeholder={"Write a small note about the interview"}
            rows="4"
            value={interviewNote}
            setValue={(e) => setInterviewNote(e.target.value)}
          />
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <div className="flex justify-end">
            <Button
              size="small"
              className={"!bg-secondary"}
              onClick={handleAdd}
            >
              Add More
            </Button>
          </div>
        </div>
      </div>
    </ProfileBlock>
  );
};

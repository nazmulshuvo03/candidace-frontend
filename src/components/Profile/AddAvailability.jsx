import { useEffect, useState } from "react";
import {
  convertLocalDayTimeStringToUTCDayTime,
  generateHourArray,
} from "../../utils/timeDate";
import { Dropdown } from "../Dropdown";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { createUserAvailability } from "../../store/middlewares/availability";
import { DateInput } from "../Input/DateInput";
import { MultiInputDropdown } from "../Dropdown/MultiInputDropdown";
import { TextInput } from "../TextInput";
import { ProfileBlock } from "../Layouts/ProfileBlock";

export const AddAvailability = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector(
    (state) => state.profession.targetProfession.skills
  );
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState();
  const [interviewNote, setInterviewNote] = useState("");

  const isTodaySelected = () => {
    if (date) {
      return date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    } else return false;
  };

  const maxSelectabaleAvailability = () => {
    const currentDate = new Date();
    const sevenDaysLaterTimestamp =
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000;
    const sevenDaysLaterDate = new Date(sevenDaysLaterTimestamp);
    const formattedDate = sevenDaysLaterDate.toLocaleString();
    return formattedDate;
  };

  const handleSubmit = () => {
    if (!date) {
      setErrorMessage("Please provide date");
      return;
    }
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
      userId: profile.id,
      dayHourUTC: convertLocalDayTimeStringToUTCDayTime(date, time - 1),
      practiceAreas: selectedPracticeAreas,
      interviewNote,
    };
    dispatch(createUserAvailability(data));
    setDate();
    setTime();
    setSelectedPracticeAreas(profile.focusAreas);
    setInterviewNote();
  };

  const handlePracticeAreaSelection = (e) => {
    setSelectedPracticeAreas(e.target.value);
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    if (profile) setSelectedPracticeAreas(profile.focusAreas);
  }, [profile]);

  return (
    <ProfileBlock
      title={`One Time Availability`}
      titleStar={!completionStatus.availabilities}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <DateInput
            label={"Date*"}
            minDate={new Date()}
            placeholder={"Select a date"}
            value={date || ""}
            onChange={(value) => {
              setDate(value);
            }}
            maxDate={maxSelectabaleAvailability()}
            className="flex-1"
          />
          <Dropdown
            label={"Time*"}
            name={"time"}
            value={time || ""}
            disabled={!date}
            options={generateHourArray(isTodaySelected())}
            onSelect={(e) => {
              setTime(e.target.value);
            }}
            defaultText="Time"
            allowSearch={false}
            className="flex-1"
          />
        </div>
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
            onClick={handleSubmit}
            className={"!bg-secondary"}
          >
            Add
          </Button>
        </div>
      </div>
    </ProfileBlock>
  );
};

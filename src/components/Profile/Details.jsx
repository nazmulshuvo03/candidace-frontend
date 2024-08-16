import { ProfileBlock } from "../Layouts/ProfileBlock";
import { Education } from "./Education";
import { InterviewExperience } from "./InterviewExperience";
import { WorkExperience } from "./WorkExperience";

export const Details = ({ visit = false }) => {
  return (
    <ProfileBlock>
      <WorkExperience visit={visit} />
      <Education visit={visit} />
      <InterviewExperience visit={visit} />
    </ProfileBlock>
  );
};

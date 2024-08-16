import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../Button/IconButton";
import { Modal } from "../../Modal";
import { useState } from "react";
import { EditTarget } from "./EditTarget";
import { TargetItem } from "./TargetItem";
import { Tooltip } from "../../Tooltip";
import { ShareProfile } from "../../ShareProfile";

export const Target = ({ visit = false }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const allSkill = useSelector((state) => state.profession.allSkill);
  const allExperienceType = useSelector(
    (state) => state.profession.allExperienceType
  );
  const completionStatus = useSelector((state) => state.user.completionStatus);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="relative flex-1 flex flex-col gap-2 pt-4">
      <div className="flex flex-col gap-2 mb-4">
        <TargetItem
          title="Target Company"
          valueArray={profile.companiesOfInterest}
          optionArray={companies}
          size="big"
          // tooltip={true}
          star={!visit && !completionStatus.companiesOfInterest}
        />
        <TargetItem
          title="Target Role"
          value={
            profile && profile.targetProfession
              ? profile.targetProfession.name || ""
              : ""
          }
        />
        <TargetItem
          title="Target Level"
          value={
            profile && profile.experienceLevel
              ? getDataLabelFromKey(
                  experienceLevels,
                  profile.experienceLevel
                ) || ""
              : ""
          }
          star={!visit && !completionStatus.experienceLevel}
        />
        <TargetItem
          title="Stage of Interviewing"
          value={
            profile && profile.preparationStage
              ? getDataLabelFromKey(
                  preparationStages,
                  profile.preparationStage
                ) || ""
              : ""
          }
          star={!visit && !completionStatus.preparationStage}
        />
        <TargetItem
          title="Focus Areas"
          valueArray={profile.focusAreas}
          optionArray={allSkill}
          star={!visit && !completionStatus.focusAreas}
        />
        <TargetItem
          title="Experience Types"
          valueArray={profile.typesOfExperience}
          optionArray={allExperienceType}
          star={!visit && !completionStatus.typesOfExperience}
        />
      </div>

      {profile.profileHeadline && profile.profileHeadline.length ? (
        <div className="h-full">
          <div className="text-sm font-normal text-text py-2 h-full">
            {profile.profileHeadline}
          </div>
        </div>
      ) : (
        <div />
      )}

      {!visit ? (
        <div className="absolute top-0 right-0 flex gap-4">
          <ShareProfile />
          <IconButton onClick={() => setEditMode(true)}>
            <Tooltip text="Edit Profile">
              <FontAwesomeIcon
                icon={faPen}
                className="text-gray-600 md:text-md"
              />
            </Tooltip>
          </IconButton>
        </div>
      ) : (
        <></>
      )}
      {editMode && (
        <Modal className="!w-11/12 !md:w-2/3 !h-4/5">
          <EditTarget
            handleDone={() => setEditMode(false)}
            handleClose={() => setEditMode(false)}
          />
        </Modal>
      )}
    </div>
  );
};

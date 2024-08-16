import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../Button";
import { COMPLETION_ITEMS } from "../../../constants/Profile";

const Item = ({ label, value, data }) => (
  <div className="flex gap-2 items-start py-0.5">
    <label className="whitespace-nowrap text-sm text-gray-500">{label}:</label>
    <div className="text-sm">
      {typeof value === "object" ? (
        <div className="flex gap-1">
          {value &&
            data &&
            value.length &&
            data.length &&
            value.map((item) => (
              <div key={item}>{getDataLabelFromKey(data, item)},</div>
            ))}
        </div>
      ) : typeof value === "boolean" ? (
        value ? (
          "Yes"
        ) : (
          "No"
        )
      ) : !value || value === "" ? (
        "N/A"
      ) : (
        value
      )}
    </div>
  </div>
);

export const ProfileModal = ({ data, setData, handleDelete }) => {
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const companies = useSelector((state) => state.static.companies);
  const professions = useSelector((state) => state.profession.items);
  const skills = useSelector((state) => state.profession.allSkill);
  const experienceTypes = useSelector(
    (state) => state.profession.allExperienceType
  );

  const displayCompletionStatus = (obj1, obj2) => {
    const result = [];
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        result.push(
          <div
            key={key}
            className="text-sm text-gray-500 flex gap-2 items-center"
          >
            {obj2[key]}
            {obj1[key] ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-500"
              />
            )}
          </div>
        );
      }
    }
    return result;
  };

  return (
    <div className="p-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <img src={data.photoURL} alt={data.userName} className="w-20 h-20" />
          <Item label={"User ID"} value={data.id} />
          <div className="flex items-center gap-1">
            <Item label={"Email"} value={data.email} />
            {data.email_verified ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="!text-green-500"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="!text-red-500"
              />
            )}
          </div>
          <Item label={"Username"} value={data.userName} />
          <Item label={"Authentication Medium"} value={data.authMedium} />
          <Item label={"Timezone"} value={data.timezone} />
          <Item label={"Unsubscribed"} value={data.unsubscribed} />
          <div className="py-2">
            <div className="text-base font-medium text-gray-800 pl-3 pb-1">
              Profile Status
            </div>
            {displayCompletionStatus(
              data.completionStatus,
              COMPLETION_ITEMS
            ).map((text, idx) => (
              <div key={idx}>{text}</div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <Item label={"Firstname"} value={data.firstName} />
          <Item label={"Lastname"} value={data.lastName} />
          <Item label={"Country"} value={data.country} />
          <Item
            label={"Target Profession"}
            value={getDataLabelFromKey(professions, data.targetProfessionId)}
          />
          <Item
            label={"Companies of Interest"}
            value={data.companiesOfInterest}
            data={companies}
          />
          <Item
            label={"Level of Experience"}
            value={getDataLabelFromKey(experienceLevels, data.experienceLevel)}
          />
          <Item label={"Focus Areas"} value={data.focusAreas} data={skills} />
          <Item label={"Google Id"} value={data.googleId} />
          <Item
            label={"Stage of Preparation"}
            value={getDataLabelFromKey(
              preparationStages,
              data.preparationStage
            )}
          />
          <Item
            label={"Experience Types"}
            value={data.typesOfExperience}
            data={experienceTypes}
          />
          <Item label={"Profile Headline"} value={data.profileHeadline} />
          <Item label={"LinkedIn Profile"} value={data.linkedInProfile} />
          <Item label={"Created At"} value={data.createdAt} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-3">
        <Button className={"!bg-red-500"} onClick={() => handleDelete(data.id)}>
          Delete Account
        </Button>
      </div>
    </div>
  );
};

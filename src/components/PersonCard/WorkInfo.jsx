import { useSelector } from "react-redux";
import { timeDistance } from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";
import { companyNameShortner } from "../../utils/string";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";
import { useEffect, useState } from "react";
import { personTag } from "../../utils/tag";
import { workProfile } from "../../utils/profile";
import moment from "moment";

const Current = ({ data, companies, experienceLevels }) => (
  <div className="text-text">
    <div className="text-base font-semibold">
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div className="text-sm font-medium flex gap-1">
      <div>{data.jobTitle}</div>
      {data.experienceId ? (
        <>
          <div style={{ fontSize: 30 }}>&middot;</div>
          <div className="italic">
            {getDataLabelFromKey(experienceLevels, data.experienceId)}
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
    <div className="flex gap-1 text-gray-600 text-xs">
      <div>
        {moment(data.startDate).format("MMM YYYY")}
        {" - "}
        {data.endDate ? moment(data.endDate).format("MMM YYYY") : "Present"}
      </div>
      <div style={{ fontSize: 30 }}>&middot;</div>
      <div>{timeDistance(data.startDate, data.endDate)}</div>
    </div>
  </div>
);

const Other = ({ data, companies, experienceLevels }) => (
  <div className="flex items-center gap-1 py-1 text-gray-600">
    <div className="text-sm">
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div style={{ fontSize: 30 }}>&middot;</div>
    <div className="flex gap-1 text-xs items-baseline">
      <div>{data.jobTitle ? `${data.jobTitle},` : ""}</div>
      <div>
        {data.experienceId
          ? `${getDataLabelFromKey(experienceLevels, data.experienceId)}`
          : ""}
      </div>
    </div>
  </div>
);

export const WorkInfo = ({ data = null }) => {
  const user = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const skillsList = useSelector(
    (state) => state.profession?.targetProfession?.skills || null
  );

  const [tags, setTags] = useState();
  const [mostRecent, setMostRecent] = useState();
  const [otherWorks, setOtherWorks] = useState();

  useEffect(() => {
    if (user && data) {
      const result = personTag(user, data, skillsList);
      setTags(result);

      const { mostRecent, rest } = workProfile(data.workExperiences);
      setMostRecent(mostRecent);
      setOtherWorks(rest);
    }
  }, [user, data]);

  return (
    <>
      {data ? (
        <div className="flex flex-col h-full w-full md:pl-6">
          <div className="flex gap-2 flex-wrap">
            {tags && tags.length ? (
              <>
                {tags.map((tag) => (
                  <ProfileCardCapsul
                    key={tag.id}
                    className={`${tag.bgColor} ${tag.textColor}`}
                  >
                    {tag.name}
                  </ProfileCardCapsul>
                ))}
              </>
            ) : (
              <div />
            )}
          </div>
          <div className="pt-2 pb-3 text-gray-600 text-sm">
            {mostRecent && (
              <Current
                data={mostRecent}
                companies={companies}
                experienceLevels={experienceLevels}
              />
            )}
          </div>
          <div className="py-3 text-gray-600 text-sm">
            {otherWorks?.map((we) => {
              return (
                <Other
                  key={we.id}
                  data={we}
                  companies={companies}
                  experienceLevels={experienceLevels}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";
import useDeviceSize from "../../hooks/useDeviceSize";
import { IconButton } from "../Button/IconButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Block } from "../Layouts/Block";
import { NoData } from "../NoData";
import moment from "moment";
import { Tooltip } from "../Tooltip";

export const Past = ({ data }) => {
  const history = useHistory();
  const deviceSize = useDeviceSize();
  const profile = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const handleNotesClick = (id) => {
    history.push({
      search: `?open=note&meeting=${id}`,
    });
  };

  const handleFeedbackClick = (id) => {
    history.push({
      search: `?open=review&meeting=${id}`,
    });
  };

  return (
    <Block
      title="Past Interviews"
      className="bg-white overflow-x-auto md:overflow-x-hidden !overflow-y-auto"
    >
      {data && data.length ? (
        <div
          className="shadow-md rounded-md"
          style={deviceSize === "sm" ? { width: "50rem" } : {}}
        >
          <div className="grid grid-cols-7 bg-gray-200 px-2 py-2 text-sm font-semibold rounded-t-md">
            <div>Date</div>
            <div className="col-span-2 flex justify-center">Type</div>
            <div>Name</div>
            <div>Company</div>
            <div>Your Feedback</div>
            <div>Peer Feedback</div>
          </div>
          {data.map((meeting, i) => {
            const meetingUser =
              profile.id === meeting.acceptor
                ? meeting.initiatorProfile
                : meeting.acceptorProfile;
            return (
              <div
                key={meeting.id}
                className={`grid grid-cols-7 items-center px-2 py-2 text-sm font-normal ${
                  i % 2 === 1 ? "bg-slate-50" : "bg-white"
                }`}
              >
                <div>
                  <Tooltip
                    text={moment(meeting.dayHourUTC).format(
                      "MMM DD, ddd, YYYY, HH:mm"
                    )}
                  >
                    {moment(meeting.dayHourUTC).format("MMM DD, hh:mm A")}
                  </Tooltip>
                </div>
                <div className="col-span-2 flex flex-wrap gap-1 items-center justify-center">
                  {meeting.practiceAreas && meeting.practiceAreas.length ? (
                    meeting.practiceAreas.map((val, i) => {
                      const label = getDataLabelFromKey(allSkill, val);
                      const nextLabel = getDataLabelFromKey(
                        allSkill,
                        meeting.practiceAreas[i + 1]
                      );
                      return (
                        <div key={val} className={`font-normal`}>
                          {label}
                          {nextLabel ? <span>{", "}</span> : <span />}
                        </div>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </div>
                <div>{meetingUser.userName}</div>
                <div>
                  {meetingUser.workExperiences &&
                  meetingUser.workExperiences.length
                    ? getDataLabelFromKey(
                        companies,
                        meetingUser.workExperiences[0].companyId
                      )
                    : ""}
                </div>
                <div>
                  <IconButton
                    size="small"
                    className="!py-2 !text-xs underline !text-secondary"
                    onClick={() => handleNotesClick(meeting.id)}
                  >
                    See Notes
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    size="small"
                    className="!py-2 !text-xs underline !text-secondary"
                    onClick={() => handleFeedbackClick(meeting.id)}
                  >
                    Evaluate
                  </IconButton>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoData size={80} image={2} message="No past interviews" />
      )}
    </Block>
  );
};

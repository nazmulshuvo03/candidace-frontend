import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../Button/IconButton";
import { getDataLabelFromKey } from "../../utils/data";
import { Button } from "../Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "../Modal";
import { Block } from "../Layouts/Block";
import { NoData } from "../NoData";
import moment from "moment";
import { cancelMeeting } from "../../store/middlewares/meeting";

export const MostRecent = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  const allSkill = useSelector((state) => state.profession.allSkill);
  const companies = useSelector((state) => state.static.companies);

  const [meetingUser, setMeetingUser] = useState();
  const [remaining, setRemaining] = useState({
    day: 0,
    hour: 0,
    min: 0,
    sec: 0,
  });
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (data && profile) {
      setMeetingUser(
        profile.id === data.acceptor
          ? data.initiatorProfile
          : data.acceptorProfile
      );
    }
  }, [data]);

  function getTimeAndDayDifference(timestamp) {
    const currentTime = new Date().getTime();
    const targetTime = new Date(timestamp).getTime();
    if (currentTime - targetTime > 0) return;
    const timeDifference = Math.abs(currentTime - targetTime);
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return {
      daysDifference,
      hoursDifference,
      minutesDifference,
      secondsDifference,
    };
  }

  useEffect(() => {
    if (data) {
      const timestamp = parseInt(data.dayHour);
      const interval = setInterval(() => {
        const difference = getTimeAndDayDifference(timestamp);
        if (!difference) {
          setRemaining();
          return () => clearInterval(interval);
        }
        setRemaining({
          day: difference.daysDifference,
          hour: difference.hoursDifference,
          min: difference.minutesDifference,
          sec: difference.secondsDifference,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const handleJoin = () => {
    window.open(data.meet, "_blank");
  };

  const handleCancel = () => {
    dispatch(
      cancelMeeting({
        meetingId: data.id,
        userId: profile.id,
      })
    );
  };

  return (
    <Block title="Next Interview" className="rounded-md bg-white p-2">
      {data && meetingUser ? (
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 justify-between items-center">
          <div className="col-span-4 md:col-span-1 border-l-2 px-1">
            <div className="text-xs text-gray-400 pb-3">
              {moment(data.dayHourUTC).format("MMM DD, dddd, hh:mm A")}
            </div>
            <div className="flex flex-col items-center px-10">
              <img
                src={meetingUser.photoURL}
                alt={"Person Profile Image"}
                className="h-32 w-32 rounded-md"
              />
              <div className="flex items-baseline gap-2 font-semibold text-md">
                <span>{meetingUser.userName}</span>
                <IconButton
                  className={`!text-secondary !font-light`}
                  style={{ fontSize: 10 }}
                  onClick={() => {
                    history.push(`/user/${meetingUser.id}`);
                  }}
                >
                  Learn More
                </IconButton>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 text-sm text-gray-500">
            <div>
              <span className="font-semibold">Current Company: </span>
              <span>
                {meetingUser.workExperiences &&
                meetingUser.workExperiences.length
                  ? getDataLabelFromKey(
                      companies,
                      meetingUser.workExperiences[0].companyId
                    )
                  : ""}
              </span>
            </div>
            <div className="">
              <span className="font-semibold mr-1">Target Company: </span>
              <>
                {meetingUser.companiesOfInterest &&
                meetingUser.companiesOfInterest.length ? (
                  <span>
                    {meetingUser.companiesOfInterest.map((ci, i) => (
                      <span key={ci} className="mr-1">
                        {getDataLabelFromKey(companies, ci)}
                        {i < meetingUser.companiesOfInterest.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span />
                        )}
                      </span>
                    ))}
                  </span>
                ) : (
                  ""
                )}
              </>
            </div>
            <div>
              <span className="font-semibold">Work Experience: </span>
              <span>X years</span>
            </div>
            <div className="">
              <span className="font-semibold mr-1">
                Interested to Practice:
              </span>
              <>
                {data.practiceAreas && data.practiceAreas.length ? (
                  <div className="flex gap-1 flex-wrap">
                    {data.practiceAreas.map((fa) => (
                      <span
                        key={fa}
                        className="bg-purple-100 text-purple-700 px-4 py-0.5 rounded-full text-xs h-fit m-1"
                      >
                        {getDataLabelFromKey(allSkill, fa)}
                      </span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </>
            </div>
            {data.interviewNote && (
              <IconButton
                size="small"
                className="!py-2 !text-xs underline !text-secondary"
                onClick={() => setShowNote(true)}
              >
                Interview Note
              </IconButton>
            )}
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 px-2 md:px-8">
            <div className="flex flex-col items-center gap-1">
              <Button
                size="small"
                className={"w-full !bg-secondary border border-secondary"}
                onClick={handleJoin}
              >
                Join Call
              </Button>
              {remaining && (
                <div className="text-xs text-gray-400">
                  {remaining.day > 0 ? <>{remaining.day}:</> : ""}
                  {remaining.hour > 0 ? <>{remaining.hour}:</> : ""}
                  {remaining.min > 0 ? <>{remaining.min}:</> : ""}
                  {remaining.sec}
                </div>
              )}
            </div>
            {data.eventId && (
              <Button
                size="small"
                className={
                  "w-full !bg-transparent border !border-gray-400 !text-gray-400"
                }
                onClick={handleCancel}
              >
                Cancel Meeting
              </Button>
            )}
          </div>
        </div>
      ) : (
        <NoData size={80} image={2} message="No interview scheduled" />
      )}
      {showNote && (
        <Modal handleClose={() => setShowNote(false)} className="w-1/3">
          <div className="p-8">
            <span className="font-semibold">Interview Note: </span>
            <span>{data.interviewNote}</span>
          </div>
        </Modal>
      )}
    </Block>
  );
};

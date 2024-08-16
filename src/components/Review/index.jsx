import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";
import { InterviewerReview } from "./InterviewerReview";

export const Review = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.profile);
  const meetingDetails = useSelector((state) => state.meeting.details);

  const [interviewer, setInterviewer] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("meeting");
    if (location.search && id) {
      dispatch(getSingleMeeting(id));
    }
    return () => dispatch(setMeetingDetails(null));
  }, [location.search]);

  useEffect(() => {
    if (meetingDetails) {
      if (user.id === meetingDetails.acceptor) {
        setInterviewer(meetingDetails.initiatorProfile);
      } else {
        setInterviewer(meetingDetails.acceptorProfile);
      }
    }
  }, [meetingDetails]);

  return (
    <div className="p-6">
      {meetingDetails && interviewer && (
        <InterviewerReview meeting={meetingDetails} interviewer={interviewer} />
      )}
    </div>
  );
};

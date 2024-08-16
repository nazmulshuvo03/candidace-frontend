import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";
import { InterviewerReview } from "./InterviewerReview";
import { useRouter } from "next/router";

export const Review = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.user.profile);
  const meetingDetails = useSelector((state) => state.meeting.details);

  const [interviewer, setInterviewer] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(router.search);
    const id = searchParams.get("meeting");
    if (router.search && id) {
      dispatch(getSingleMeeting(id));
    }
    return () => dispatch(setMeetingDetails(null));
  }, [router.search]);

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

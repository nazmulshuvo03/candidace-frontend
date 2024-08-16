import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Stars } from "../Stars";
import { TextInput } from "../TextInput";
import {
  createInterviewerReview,
  getInterviewerReview,
} from "../../store/middlewares/review";
import moment from "moment";

export const InterviewerReview = ({ meeting, interviewer }) => {
  const dispatch = useDispatch();
  const [punctuality, setPunctuality] = useState(0);
  const [preparedness, setPreparedness] = useState(0);
  const [depthOfFeedback, setDepthOfFeedback] = useState(0);
  const [comments, setComments] = useState("");

  const submitReview = async () => {
    const data = {
      meetingId: meeting.id,
      interviewerId: interviewer.id,
      punctuality,
      preparedness,
      depthOfFeedback,
      comments,
    };
    const response = await dispatch(createInterviewerReview(data));
    return response;
  };

  const fetchReviewData = async () => {
    const alreadyExists = await dispatch(
      getInterviewerReview({
        meetingId: meeting.id,
        interviewerId: interviewer.id,
      })
    );
    if (alreadyExists) {
      setPunctuality(alreadyExists.punctuality);
      setPreparedness(alreadyExists.preparedness);
      setDepthOfFeedback(alreadyExists.depthOfFeedback);
      setComments(alreadyExists.comments);
    }
  };

  useEffect(() => {
    if (meeting && interviewer) {
      fetchReviewData();
    }
  }, [meeting, interviewer]);

  return (
    <>
      {meeting && interviewer && (
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex items-center justify-center gap-3 pt-4 pb-8">
            <div className="flex-1 border-t mx-2" />
            <div className="text-lg font-medium text-gray-600">
              Rate your Experience with {interviewer.userName} Interviewer
            </div>
            <div className="flex-1 border-t mx-2" />
          </div>
          <div className="text-base text-gray-500 font-light">
            <div className="pb-3">
              {interviewer.firstName && (
                <div>
                  Name: {interviewer.firstName} {interviewer.lastName}
                </div>
              )}
              <div>Email: {interviewer.email}</div>
              <div>
                Interview Date and Time:{" "}
                {moment(meeting.dayHourUTC).format("dddd, MMM DD, YYYY")}
              </div>
            </div>
            <div className="pb-5">
              <div className="flex gap-2 items-center">
                Punctuality:{" "}
                <Stars
                  color="blue"
                  value={punctuality}
                  setValue={setPunctuality}
                />
              </div>
              <div className="flex gap-2 items-center">
                Question Preparedness:{" "}
                <Stars
                  color="blue"
                  value={preparedness}
                  setValue={setPreparedness}
                />
              </div>
              <div className="flex gap-2 items-center">
                Depth of Feedback:{" "}
                <Stars
                  color="blue"
                  value={depthOfFeedback}
                  setValue={setDepthOfFeedback}
                />
              </div>
            </div>
            <div className="pb-6">
              <TextInput
                placeholder="Additional Comments"
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <div className="flex justify-center" onClick={submitReview}>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

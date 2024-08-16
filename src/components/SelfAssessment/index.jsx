import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeeting } from "../../store/middlewares/meeting";
import { setMeetingDetails } from "../../store/slices/meeting";
import { getDataLabelFromKey } from "../../utils/data";
import { SelfReview } from "./SelfReview";
import { fetchAllReviewQuestions } from "../../store/middlewares/review";

export const SelfAssessment = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const meetingDetails = useSelector((state) => state.meeting.details);
  const allSkill = useSelector((state) => state.profession.allSkill);

  const [meetingId, setMeetingId] = useState();
  const [questions, setQuestions] = useState();
  const [tabs, setTabs] = useState([]);

  const idExists = (name, arr) => {
    return arr.some((obj) => obj.name === name);
  };

  const getAllQuestions = async (practiceAreas) => {
    const questionsData = {};
    for (let pa of practiceAreas) {
      const response = await dispatch(fetchAllReviewQuestions(pa));
      if (response) {
        questionsData[pa] = response;
      } else {
        questionsData[pa] = {
          type1: [],
          type2: [],
        };
      }
    }
    setQuestions(questionsData);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("meeting");
    if (location.search && id) {
      setMeetingId(id);
    }

    return () => dispatch(setMeetingDetails(null));
  }, [location.search]);

  useEffect(() => {
    if (meetingId) {
      dispatch(getSingleMeeting(meetingId));
    }
  }, [meetingId]);

  useEffect(() => {
    if (meetingDetails && meetingDetails.practiceAreas) {
      getAllQuestions(meetingDetails.practiceAreas);
    }
  }, [meetingDetails]);

  useEffect(() => {
    if (
      questions &&
      Object.keys(questions).length &&
      meetingDetails &&
      meetingDetails.practiceAreas
    ) {
      const tabData = [];
      for (let pa of meetingDetails.practiceAreas) {
        const paName = getDataLabelFromKey(allSkill, pa);
        if (!idExists(paName, tabData)) {
          tabData.push({
            id: tabData.length + 1,
            name: paName,
            component: (
              <SelfReview
                meeting={meetingDetails}
                questionType1={questions[pa].type1}
                questionType2={questions[pa].type2}
                practiceAreaId={pa}
              />
            ),
          });
        }
      }
      setTabs(tabData);
    }
  }, [questions, meetingDetails]);

  return (
    <div className="p-6">
      {meetingDetails && <HorizontalTabs data={tabs} />}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserMeetings } from "../../store/middlewares/meeting";
import { Past } from "./Past";
import { Upcoming } from "./Upcoming";
import { MostRecent } from "./MostRecent";
import { useLocation } from "react-router-dom";
import { Modal } from "../Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Review } from "../Review";
import { SelfAssessment } from "../SelfAssessment";

export const Meetings = () => {
  const location = useLocation();
  const history = useHistory();
  const profile = useSelector((state) => state.user.profile);
  const meetings = useSelector((state) => state.meeting.userMeetings);
  const dispatch = useDispatch();
  const [mostRecent, setMostRecent] = useState();
  const [upcoming, setUpcoming] = useState();
  const [past, setPast] = useState();
  const [openReview, setOpenReview] = useState();
  const [openNotes, setOpenNotes] = useState();

  const splitByTime = (arr) => {
    let past = [];
    let nowAndFuture = [];
    let currentTime = new Date().getTime();
    let mostRecent;
    if (arr && arr.length) {
      arr.forEach((obj) => {
        const timeValue = obj.dayHour;
        if (timeValue <= currentTime) {
          past.push(obj);
        } else {
          nowAndFuture.push(obj);
        }
      });
      nowAndFuture.sort((a, b) => a.dayHour - b.dayHour);
      mostRecent = nowAndFuture.shift();
    }
    return { past, nowAndFuture, mostRecent };
  };

  useEffect(() => {
    if (profile) {
      dispatch(getUserMeetings(profile.id));
    }
  }, [profile]);

  useEffect(() => {
    if (meetings) {
      const { past, nowAndFuture, mostRecent } = splitByTime(meetings);
      setPast(past);
      setUpcoming(nowAndFuture);
      setMostRecent(mostRecent);
    }
  }, [meetings]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const open = searchParams.get("open");
    const modeParam = searchParams.get("meeting");
    if (open === "review") {
      setOpenReview(modeParam);
    } else if (open === "note") {
      setOpenNotes(modeParam);
    } else {
      setOpenReview();
      setOpenNotes();
    }
  }, [location.search]);

  return (
    <div className="px-3 md:px-10 py-3 md:py-6 pb-2  h-full overflow-y-auto overflow-x-hidden">
      <div className="grid grid-cols-1 gap-4">
        <MostRecent data={mostRecent} />
        <Upcoming data={upcoming} />
        <Past data={past} />
      </div>
      {openReview && (
        <Modal
          handleClose={() => {
            history.push({
              search: "",
            });
          }}
          className="!w-11/12 !h-svh"
        >
          <Review />
        </Modal>
      )}
      {openNotes && (
        <Modal
          handleClose={() => {
            history.push({
              search: "",
            });
          }}
          className="!w-11/12 !h-svh"
        >
          <SelfAssessment />
        </Modal>
      )}
    </div>
  );
};

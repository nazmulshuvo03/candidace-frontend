import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { NoData } from "../../NoData";
import moment from "moment";

export const Notes = ({ data = null }) => {
  const user = useSelector((state) => state.user.profile);

  return (
    <div className="h-full">
      {data && data.length ? (
        <>
          {data.map((item) => {
            const interviewerProfile =
              user.id === item.meeting.acceptorProfile.id
                ? item.meeting.initiatorProfile
                : item.meeting.acceptorProfile;
            return (
              <div
                key={item.id}
                className="my-3 bg-background py-2 px-1 rounded-sm text-gray-600"
              >
                <div className="pt-1 pb-3">{item.note}</div>
                <Link
                  to={`/user/${interviewerProfile.id}`}
                  className="flex gap-1 text-gray-500 text-xs italic"
                >
                  <div>-</div>
                  <div>{interviewerProfile.userName},</div>
                  <div>
                    {moment(item.meeting.dayHourUTC).format(
                      "MMM DD, ddd, hh:mm A"
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-36">
          <NoData message={`No notes yet`} size={90} />
        </div>
      )}
    </div>
  );
};

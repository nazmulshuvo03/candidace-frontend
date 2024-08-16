import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageArea } from "./ImageArea";
import { WorkInfo } from "./WorkInfo";
import { ActionArea } from "./ActionArea";
import { getDataLabelFromKey } from "../../utils/data";
import { BookSlot } from "./BookSlot";
import { useState } from "react";
import { Modal } from "../Modal";
import { createMeeting } from "../../store/middlewares/meeting";
import { MIXPANEL_TRACK } from "../../utils/mixpanel";

export const PersonCard = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.profile);
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  const [selectedSlot, setSelectedSlot] = useState(false);

  const handleBook = async () => {
    const payload = {
      availabilityId: selectedSlot.id,
      acceptorId: user.id,
      initiatorId: data.id,
    };
    await dispatch(createMeeting(payload, "people"));
    setSelectedSlot();
  };

  const handleProfileVisit = () => {
    MIXPANEL_TRACK({
      name: "Profile Visited",
      data: { visitorId: user.id },
      id: data.id,
    });
    history.push(`/user/${data.id}`);
  };

  return (
    <div className="w-full h-fit bg-white rounded-md shadow-md px-2 md:px-4 py-2">
      <div className="grid md:grid-cols-12 grid-cols-1 border-b">
        <div className="col-span-2">
          <ImageArea data={data} handleProfileVisit={handleProfileVisit} />
        </div>
        <div className="col-span-8">
          <WorkInfo data={data} />
        </div>
        <div className="col-span-2 text-right">
          <div className="text-gray-600 text-xs">
            {data.preparationStage
              ? getDataLabelFromKey(preparationStages, data.preparationStage)
              : ""}
          </div>
          {/* <IconButton>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-300 !text-lg"
            />
          </IconButton> */}
        </div>
      </div>
      <div className="pt-2">
        <ActionArea
          data={data}
          onNextAvailableClick={setSelectedSlot}
          handleClick={handleProfileVisit}
        />
      </div>
      {selectedSlot && data ? (
        <Modal handleClose={() => setSelectedSlot()} className="md:w-2/3">
          <BookSlot
            data={data}
            selected={selectedSlot}
            setSelected={setSelectedSlot}
            handleClose={() => setSelectedSlot()}
            handleBook={handleBook}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

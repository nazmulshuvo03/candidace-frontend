import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalMessageData } from "../../store/slices/global";
import { MeetingSuccess } from "./MeetingSuccess";
import { Modal } from "../Modal";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ProfessionRequired } from "./ProfessionRequired";
import { ResetPassSuccess } from "./ResetPassSuccess";

const ModalMessage = () => {
  const dispatch = useDispatch();
  const messageData = useSelector((state) => state.global.modalMessageData);

  const handleClose = () => {
    dispatch(setModalMessageData(null));
  };

  return (
    <Modal className="relative" handleClose={handleClose}>
      {messageData && messageData.name === "meetingSuccess" ? (
        <MeetingSuccess data={messageData} />
      ) : messageData && messageData.name === "professionRequired" ? (
        <ProfessionRequired data={messageData.data} />
      ) : messageData && messageData.name === "resetPassSuccess" ? (
        <ResetPassSuccess data={messageData.data} />
      ) : (
        <div />
      )}
      <IconButton onClick={handleClose} className="absolute top-6 right-6">
        <FontAwesomeIcon icon={faClose} className="text-gray-700 text-lg" />
      </IconButton>
    </Modal>
  );
};

export default ModalMessage;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../store/slices/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faLightbulb,
  faThumbsUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
// import "./Toast.css";
import { TOAST_TYPES } from "../../constants/Toast";

const Toast = ({
  message = "Empty Message",
  description = "",
  type = TOAST_TYPES[2],
  onClose = () => {},
  duration = 2000,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      dispatch(handleClose());
    }, duration);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    dispatch(setToastMessage(null));
    onClose && onClose();
  };

  const getIcon = () => {
    switch (type) {
      case TOAST_TYPES[0]:
        return (
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="h-4 w-4 md:h-8 md:w-8 text-green-500"
          />
        );
      case TOAST_TYPES[1]:
        return (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="h-4 w-4 md:h-8 md:w-8 text-red-500"
          />
        );
      case TOAST_TYPES[2]:
        return (
          <FontAwesomeIcon
            icon={faLightbulb}
            className="h-4 w-4 md:h-8 md:w-8 text-yellow-500"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed bottom-5 md:bottom-20 left-2 md:left-10 max-w-full md:min-w-96 flex items-center z-50 bg-background rounded-md ${
        visible ? "toast-message-slide-in" : "toast-message-slide-out"
      }`}
    >
      <div className="p-3 w-full rounded-md shadow-md flex items-center justify-between">
        <div className="my-auto">{getIcon()}</div>
        <div className="flex-1 px-2">
          <h2 className="text-sm md:text-lg font-semibold">{message}</h2>
          {description && <p>{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 px-2 h-6 w-6 md:h-10 md:w-10 flex items-center justify-center rounded-full"
          >
            <FontAwesomeIcon icon={faX} className="h-2 w-2 md:h-4 md:w-4 " />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;

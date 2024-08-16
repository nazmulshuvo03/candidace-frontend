import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPen,
  faSave,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  checkUserProperty,
  updateUserData,
} from "../../../store/middlewares/user";
import { UnderlineInput } from "../../Input/UnderlineInput";
import { IconButton } from "../../Button/IconButton";

export const UserName = ({ visit = false }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState();
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleUserNameEditCancel = () => {
    setEditMode(false);
    setUserName(profile.userName);
  };

  const handleUserNameEditSave = () => {
    dispatch(updateUserData(profile.id, { userName }));
    setEditMode(false);
    setUserName(profile.userName);
  };

  const checkIfUserExists = async () => {
    const exists = await dispatch(checkUserProperty({ userName }));
    setAlreadyExists(exists);
  };

  useEffect(() => {
    setUserName(profile.userName);
  }, [profile]);

  useEffect(() => {
    if (userName && userName.length > 3) {
      checkIfUserExists();
    }
  }, [userName]);

  return (
    <div className="flex gap-2 items-center">
      <FontAwesomeIcon className="text-gray-500 h-3 w-3" icon={faUser} />
      {editMode ? (
        <UnderlineInput
          value={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
          className={`text-xs ${
            alreadyExists ? "border-red-500 !text-red-500" : ""
          }`}
        />
      ) : (
        <div className="text-xs text-gray-500 w-32">
          {userName ? userName : "User Name"}
        </div>
      )}
      {!visit ? (
        <>
          {editMode ? (
            <div className="flex items-center gap-1">
              {!alreadyExists && (
                <IconButton
                  onClick={handleUserNameEditSave}
                  className={"!bg-transparent !text-gray-500 !p-0"}
                >
                  <FontAwesomeIcon
                    className="text-gray-500 h-3 w-3"
                    icon={faSave}
                  />
                </IconButton>
              )}
              <IconButton
                onClick={handleUserNameEditCancel}
                className={"!bg-transparent !text-gray-500 !p-0"}
              >
                <FontAwesomeIcon
                  className="text-gray- h-3 w-3"
                  icon={faClose}
                />
              </IconButton>
            </div>
          ) : (
            <IconButton
              onClick={() => setEditMode(true)}
              className={"!bg-transparent !text-gray-500 !p-0"}
            >
              <FontAwesomeIcon className="text-gray-500 h-3 w-3" icon={faPen} />
            </IconButton>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

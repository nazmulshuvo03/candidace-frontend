import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { UserName } from "./UserName";
import { Target } from "./Target";
import { AdditionalInfo } from "../Reviews/AdditionalInfo";
import { uploadFile } from "../../../store/middlewares/file";
import { updateUserData } from "../../../store/middlewares/user";
import { ProfileBlock } from "../../Layouts/ProfileBlock";
import { ProfilePhoto } from "./ProfilePhoto";
import { IconButton } from "../../Button/IconButton";
import { setChat } from "../../../store/slices/global";

export const Info = ({ visit = false }) => {
  const dispatch = useDispatch();
  const [newPP, setNewPP] = useState();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  const handlePPSubmit = async () => {
    const formData = new FormData();
    formData.append("file", newPP);
    const imageData = await dispatch(uploadFile(formData));
    dispatch(updateUserData(profile.id, { photoURL: imageData.Location }));
    setNewPP();
  };

  const openChat = () => {
    dispatch(setChat(profile));
  };

  return (
    <ProfileBlock>
      <div className="flex-1 md:p-2">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:px-4 flex gap-2 justify-between md:flex-col">
            <div className="flex items-center justify-start">
              <div className="flex flex-col items-center">
                <ProfilePhoto
                  {...{ newPP, setNewPP, profile, handlePPSubmit, visit }}
                />
                <div className="flex gap-2 font-semibold text-base md:text-lg">
                  {!visit ? (
                    <>
                      <span>{profile.firstName}</span>
                      <span>{profile.lastName}</span>
                    </>
                  ) : (
                    <span>{profile.userName}</span>
                  )}
                </div>
                <div className="text-xs md:text-sm font-normal text-gray-500">
                  {profile.country}
                </div>
                {visit && (
                  <IconButton
                    className={"!text-secondary !text-xs my-2 hover:underline"}
                    onClick={openChat}
                  >
                    Send Message
                  </IconButton>
                )}
              </div>
            </div>
            <div className="pt-5">
              {!visit && profile.email ? (
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    className="text-gray-500 h-3 w-3"
                    icon={faEnvelope}
                  />
                  <div className="text-xs text-gray-500">{profile.email}</div>
                </div>
              ) : (
                ""
              )}
              {!visit && <UserName visit={visit} />}
            </div>
          </div>
          <Target visit={visit} />
        </div>
      </div>
      <div className="flex justify-end items-center mt-4">
        <AdditionalInfo reviews={profile.reviews} />
      </div>
    </ProfileBlock>
  );
};

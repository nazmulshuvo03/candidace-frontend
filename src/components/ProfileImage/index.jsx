import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/middlewares/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { uploadFile } from "../../store/middlewares/file";

export const ProfileImage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [image, setImage] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    const responseData = dispatch(uploadFile(formData));
    return responseData;
  };

  const handleImageUpload = async () => {
    const imageData = await uploadImage(image);
    dispatch(updateUserData(profile.id, { photoURL: imageData.Location }));
    setImage();
  };

  const fileInputRef = React.createRef();

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div
          className="rounded h-36 w-36 bg-cover bg-center cursor-pointer border-2 shadow-md"
          onClick={handleImageClick}
        >
          <img
            src={image ? URL.createObjectURL(image) : profile.photoURL}
            alt="Preview"
            className="h-full w-full max-h-full max-w-full object-cover"
          />
        </div>
      </div>
      {image ? (
        <div className="flex gap-5">
          <div onClick={handleImageUpload} className="cursor-pointer">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="h-8 w-8 text-green-500"
            />
          </div>
          <div onClick={() => setImage()} className="cursor-pointer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="h-8 w-8 text-red-500"
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

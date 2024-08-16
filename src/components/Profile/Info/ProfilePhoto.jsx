import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../../Button/IconButton";
import { faCheck, faClose, faUpload } from "@fortawesome/free-solid-svg-icons";

export const ProfilePhoto = ({
  newPP,
  setNewPP,
  profile,
  handlePPSubmit,
  visit,
}) => {
  return (
    <>
      <label className="relative inline-block cursor-pointer">
        <img
          src={newPP ? URL.createObjectURL(newPP) : profile.photoURL}
          alt={"Person Profile Image"}
          defaultsrc="https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png"
          className="h-16 w-16 md:h-32 md:w-32 rounded-full my-2 transition duration-300 ease-in-out transform hover:scale-105"
        />
        {!visit && (
          <div
            className="h-16 w-16 md:h-32 md:w-32 rounded-full my-2 absolute inset-0 flex items-center justify-center 
          bg-gray-800 bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-50 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon className="text-3xl text-white" icon={faUpload} />
          </div>
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          name="photoURL"
          disabled={visit}
          onChange={(e) => {
            const file = e.target.files[0];
            setNewPP(file);
          }}
        />
      </label>
      {newPP ? (
        <div className="flex items-center gap-4">
          <IconButton
            onClick={handlePPSubmit}
            className="!text-green-400 !px-2 !py-1 rounded-full"
          >
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
          <IconButton
            onClick={() => setNewPP()}
            className="!text-red-400 !px-2.5 !py-1 rounded-full"
          >
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { NoData } from "../../NoData";
import { Input } from "../../Input";
import { useEffect, useState } from "react";
import { deleteUserData, fetchProfiles } from "../../../store/middlewares/user";
import { timezoneLastpart, uuidShortner } from "../../../utils/string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleExclamation,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";
import { ProfileModal } from "./ProfileModal";
import { getDataLabelFromKey } from "../../../utils/data";
import { isProfileComplete } from "../../../utils/profile";
import moment from "moment";
import useDeviceSize from "../../../hooks/useDeviceSize";

const Label = ({ children = "", colSpan = 1 }) => (
  <div
    className={`col-span-${colSpan} text-sm text-ellipsis whitespace-nowrap overflow-hidden`}
  >
    {children}
  </div>
);

export const UserAdmin = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);
  const deviceSize = useDeviceSize();

  const [allProfile, setAllProfile] = useState();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [selectedProfile, setSelectedProfile] = useState();

  const getProfiles = async () => {
    const profiles = await dispatch(fetchProfiles());
    setAllProfile(profiles);
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteUserData(userId));
    setFilteredData(() => allProfile.filter((item) => item.id !== userId));
    setSelectedProfile();
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    if (query && query.length && allProfile) {
      setFilteredData(() =>
        allProfile.filter((item) =>
          item.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredData(allProfile);
  }, [query, allProfile]);

  return (
    <div
      className="flex flex-col gap-2 overflow-x-auto"
      style={{ maxWidth: "90vw" }}
    >
      <Input
        className=""
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"Search by email"}
        icon={<FontAwesomeIcon icon={faSearch} />}
      />
      <div
        className="text-center"
        style={deviceSize === "sm" ? { width: "60rem" } : {}}
      >
        <div className="border border-primary px-2 py-1 grid grid-cols-12 text-sm font-semibold bg-primary text-white">
          <Label>User ID</Label>
          <Label colSpan={2}>Email</Label>
          <Label colSpan={2}>Target Profession</Label>
          <Label>Profile Complete</Label>
          <Label>Medium</Label>
          <Label colSpan={1}>Timezone</Label>
          <Label>Unsubscribed</Label>
          <Label>Created At</Label>
          <Label>Last Login</Label>
        </div>
        <div style={{ height: "70vh", overflowY: "auto" }}>
          {filteredData && filteredData.length ? (
            <>
              {filteredData.map((profile) => {
                return (
                  <div
                    key={profile.id}
                    className="border border-primary px-2 py-2 grid grid-cols-12 text-xs hover:shadow-md cursor-pointer"
                    onClick={() => setSelectedProfile(profile)}
                  >
                    <div className="col-span-1">
                      {uuidShortner(profile.id, 3)}
                    </div>
                    <div className="col-span-2 flex items-center justify-center gap-1">
                      {profile.email}{" "}
                      {profile.email_verified ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="!text-green-500"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          className="!text-red-500"
                        />
                      )}
                    </div>
                    <div className="col-span-2">
                      {getDataLabelFromKey(
                        professions,
                        profile.targetProfessionId
                      )}
                    </div>
                    <div className="col-span-1">
                      {isProfileComplete(profile.completionStatus) ? (
                        <span className="bg-green-500 text-white py-1 px-2 rounded-md">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white py-1 px-2 rounded-md">
                          No
                        </span>
                      )}
                    </div>
                    <div className="col-span-1">{profile.authMedium}</div>
                    <div className="col-span-1">
                      {timezoneLastpart(profile.timezone)}
                    </div>
                    <div className="col-span-1">
                      {profile.unsubscribed ? (
                        <span className="text-red-500 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                    <div className="col-span-1">
                      {moment(profile.createdAt).fromNow()}
                    </div>
                    <div className="col-span-1">
                      {profile.lastVisit
                        ? moment(profile.lastVisit).fromNow()
                        : "-"}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <NoData className="!w-40 !h-40" />
            </div>
          )}
        </div>
      </div>
      {selectedProfile && (
        <Modal
          handleClose={() => setSelectedProfile()}
          className="w-full h-full"
        >
          <ProfileModal data={selectedProfile} handleDelete={handleDelete} />
        </Modal>
      )}
    </div>
  );
};

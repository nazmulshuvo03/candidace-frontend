import { Button } from "../../Button";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modal";
import { IconButton } from "../../Button/IconButton";
import { MandatoryStar } from "../../MandatoryStar";
import { NoData } from "../../NoData";

export const Experience = ({
  title = "",
  data,
  formData,
  showInput,
  setShowInput,
  handleEditClick,
  handleDeleteClick,
  editItem,
  handleEditClose,
  handleChange,
  handleSubmit,
  star = false,
  visit = false,
}) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold uppercase">
          {title} {star && <MandatoryStar />}
        </div>
        {!visit ? (
          <Button
            className="!bg-transparent !text-gray-500 !p-0 text-2xl"
            onClick={() => setShowInput(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        ) : (
          <div />
        )}
      </div>
      <div className="pt-4 pb-2">
        {data && data.length ? (
          data.map((wp) => {
            return (
              <Display
                key={wp.id}
                data={wp}
                title={title}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                visit={visit}
              />
            );
          })
        ) : (
          <NoData
            size={48}
            message={`No ${title} Provided`}
            className={"bg-background"}
          />
        )}
      </div>
      {showInput && (
        <Modal className="!w-4/5 !h-1/2">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between pb-4">
              <div className="text-lg font-semibold uppercase">
                {!editItem ? "Add" : "Edit"} {title}
              </div>
              <IconButton onClick={handleEditClose}>
                <FontAwesomeIcon
                  icon={faClose}
                  className="text-gray-500 text-2xl"
                />
              </IconButton>
            </div>
            <AddNew
              data={formData}
              title={title}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

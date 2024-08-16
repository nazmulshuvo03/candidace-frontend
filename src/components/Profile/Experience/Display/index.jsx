import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Work } from "./Work";
import { Education } from "./Education";
import { Interview } from "./Interview";

export const Display = ({
  data,
  title,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
  visit = false,
}) => {
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="px-2 relative pb-3 flex justify-between items-start">
      {title === "Work Experience" ? (
        <Work data={data} />
      ) : title === "Education" ? (
        <Education data={data} />
      ) : title === "Interview Experience" ? (
        <Interview data={data} />
      ) : (
        <div />
      )}
      {!visit ? (
        <div className="flex gap-2 text-xs">
          <div
            className="cursor-pointer"
            onClick={() => handleEditClick(data.id)}
          >
            <FontAwesomeIcon icon={faEdit} className="text-gray-400" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteClick(data.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-gray-400" />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

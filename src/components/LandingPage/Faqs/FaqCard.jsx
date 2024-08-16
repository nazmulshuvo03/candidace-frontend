import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../../Button/IconButton";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "./style.module.css";

export const FaqCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b border-text py-2 md:py-4 ${
        data.id === 1 ? "border-t" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="text-sm md:text-base font-medium">{data.qn}</div>
        <IconButton>
          <FontAwesomeIcon
            icon={open ? faAngleUp : faAngleDown}
            className="w-3 h-3 md:w-4 md:h-4 text-text"
          />
        </IconButton>
      </div>
      <div
        className={`py-4 pl-4 text-xs md:text-sm font-light ${
          open ? `${styles.animateSlideDown}` : `${styles.animateSlideUp}`
        }`}
      >
        {data.ans}
      </div>
    </div>
  );
};

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../Button/IconButton";
import { Tooltip } from "../Tooltip";
import { config } from "../../../.config";
import { faCopy, faPen } from "@fortawesome/free-solid-svg-icons";
import { faCopy as faCopied } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

export const ShareProfile = () => {
  const profile = useSelector((state) => state.user.profile);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const formattedURL = `${config.FRONTEND_URL}/public-profile/${profile.id}`;
    navigator.clipboard
      .writeText(formattedURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <IconButton onClick={handleCopy}>
      <Tooltip text="Share Profile">
        <FontAwesomeIcon
          icon={copied ? faCopied : faCopy}
          className={`text-gray-600 md:text-md`}
        />
      </Tooltip>
    </IconButton>
  );
};

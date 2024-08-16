import { faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShareProfile } from "../ShareProfile";
import { useSelector } from "react-redux";

export const FooterSocials = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div className="flex gap-2">
      <div
        to={{
          pathname: "https://twitter.com/candidacefyi",
        }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faXTwitter} />
      </div>
      <div
        to={{
          pathname: "https://www.linkedin.com/company/candidace-fyi",
        }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
      {profile && <ShareProfile />}
    </div>
  );
};

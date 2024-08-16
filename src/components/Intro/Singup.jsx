import { useState } from "react";
import { Modal } from "../Modal";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Messages = [
  <div>
    To Set Your Profile go to the Profile tab and follow the instructions. Your
    profile needs to be complete before you can start practicing mock
    interviews.
  </div>,
  <div>
    To Schedule Mock Interviews go to Search and Schedule tab and filter
    participants based on your choice and requirements. To know more about the
    person, click on Learn More. If you want to schedule mocks, just click on
    their next availability to book or select other available times.
  </div>,
  <div>
    To see all your Scheduled Interviews, Past Interviews, and to give Feedback
    for your last Interview go to the Interviews tab.
  </div>,
  <div>To Track Your Progress go to the Progress tab. Happy Practicing!</div>,
];

export const SignupIntro = () => {
  const history = useHistory();

  const [state, setState] = useState(0);

  const handlePrev = () => setState((prev) => (prev - 1 < 0 ? prev : prev - 1));

  const handleNext = () =>
    setState((prev) => (prev + 1 < Messages.length ? prev + 1 : prev));

  return (
    <Modal className="md:w-1/3">
      <div
        className="relative px-6 py-4 flex flex-col"
        style={{ height: "33vh" }}
      >
        <div className="text-center text-gray-600 text-2xl font-normal mb-6">
          Lets get Started
        </div>
        <div className="flex-1 text-justify text-gray-500">
          {Messages[state]}
        </div>
        <div className="w-full flex justify-between">
          {state !== 0 ? (
            <IconButton className="!text-gray-600" onClick={handlePrev}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </IconButton>
          ) : (
            <span />
          )}
          {state < Messages.length - 1 ? (
            <IconButton className="!text-gray-600" onClick={handleNext}>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </IconButton>
          ) : (
            <Button onClick={() => history.push("/profile")} size="small">
              Go To Profile
            </Button>
          )}
        </div>
        <IconButton
          className="absolute top-2 right-4 !text-gray-600 !text-lg"
          onClick={() =>
            history.push({
              search: "",
            })
          }
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </div>
    </Modal>
  );
};

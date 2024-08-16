import { useState } from "react";
import { Input } from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faFilter,
  faFilterCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../Button/IconButton";

export const HorizontalTabs = ({
  data = [{ id: 1, name: "First Tab", component: <div>Empty Content</div> }],
  allowSearch = false,
  searchValue = "",
  handleSearch = () => {},
  showReset = false,
  handleReset = () => {},
  showFilterToggle = false,
  showFilters = false,
  setShowFilters = () => {},
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-baseline border-b border-gray-700 py-1 px-2">
        <div className="flex gap-8">
          {data && data.length ? (
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentTab(item.id - 1)}
                  className={`${
                    currentTab === item.id - 1 ? "underline" : "text-gray-400"
                  } flex justify-start items-center cursor-pointer text-sm font-semibold`}
                >
                  {item.name}
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
        <div className="flex gap-2 items-center">
          {allowSearch ? (
            <div className="hidden md:block md:w-72">
              <Input
                placeholder="Search by Username"
                value={searchValue}
                onChange={handleSearch}
                style={{ backgroundColor: "#eceef8" }}
                icon={
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-sm text-gray-500"
                  />
                }
              />
            </div>
          ) : (
            <div />
          )}
          {showFilterToggle && (
            <IconButton>
              <FontAwesomeIcon
                icon={showFilters ? faFilterCircleXmark : faFilter}
                className="text-gray-600 w-4 h-4"
                onClick={() => setShowFilters((prev) => !prev)}
              />
            </IconButton>
          )}
          {showReset && (
            <IconButton>
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                className="text-gray-600 w-4 h-4"
                onClick={handleReset}
              />
            </IconButton>
          )}
        </div>
      </div>
      <div className="h-full overflow-hidden">
        {data[currentTab] ? data[currentTab].component : ""}
      </div>
    </div>
  );
};

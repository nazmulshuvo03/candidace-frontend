import { useState } from "react";

export const HorizontalTabs = ({
  data = [{ id: 1, name: "First Tab", component: <div>Empty Content</div> }],
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center flex-wrap gap-4 py-1 px-2 w-full whitespace-nowrap">
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
      <div className="flex-1 overflow-hidden">
        {data[currentTab] ? data[currentTab].component : ""}
      </div>
    </div>
  );
};

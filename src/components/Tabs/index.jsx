import { useState } from "react";

export const Tabs = ({
  data = [{ id: 1, name: "First Tab", component: <div>Empty Content</div> }],
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="flex h-full w-full">
      <div className="bg-primary pt-20" style={{ width: "17vw" }}>
        {data && data.length ? (
          data.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrentTab(item.id - 1)}
                className={`${
                  currentTab === item.id - 1
                    ? "bg-background text-gray-700"
                    : "text-text"
                } w-full h-8 flex justify-start items-center cursor-pointer text-sm font-semibold ml-10 pl-2`}
              >
                {item.name}
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>
      <div className="flex-1 h-full overflow-y-auto">
        {data[currentTab] ? data[currentTab].component : ""}
      </div>
    </div>
  );
};

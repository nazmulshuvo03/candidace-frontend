import useDeviceSize from "../../../hooks/useDeviceSize";
import { Block } from "../../Layouts/Block";
import { ProgressChart } from "./ProgressChart";
import { ProgressHighlight } from "./ProgressHighlight";

export const ProgressTracker = ({ data, progressData }) => {
  const deviceSize = useDeviceSize();

  return (
    <Block title="Progress Tracker">
      <div className="h-full flex flex-col md:flex-row">
        {deviceSize !== "sm" && <ProgressChart data={progressData} />}
        <ProgressHighlight data={data} />
      </div>
    </Block>
  );
};

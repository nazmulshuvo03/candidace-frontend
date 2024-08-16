import { AddAvailability } from "../Profile/AddAvailability";
import { Schedules } from "../Profile/Schedules";
import { Recurrent } from "./Recurrent";

export const AvailabilityPage = () => {
  return (
    <div className="px-3 md:px-6 pt-3 md:pt-6 pb-4 flex flex-col md:flex-row gap-5 h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="flex-1 flex flex-col gap-4">
        <AddAvailability />
        <Recurrent />
      </div>
      <div className="flex-1">
        <Schedules />
      </div>
    </div>
  );
};

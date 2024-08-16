import { useEffect, useState } from "react";

const DEFAULT_ITEMS = {
  punctuality: 0,
  preparedness: 0,
  depthOfFeedback: 0,
};

export const AdditionalInfo = ({ reviews }) => {
  const [infos, setInfos] = useState();

  useEffect(() => {
    if (reviews && reviews.length) {
      const values = DEFAULT_ITEMS;
      Object.keys(values).map((key) => {
        let count = 0;
        for (let review of reviews) {
          count += review[key];
        }
        count /= reviews.length;
        count = (count * 100) / 5;
        values[key] = count;
      });
      setInfos(values);
    }
  }, [reviews]);

  return (
    <>
      {infos && (
        <div className="text-xs font-semibold flex gap-4">
          <div>Punctuality: {infos.punctuality}%</div>
          <div>Meeting Preparedness: {infos.preparedness}%</div>
          <div>Depth of Feedback: {infos.depthOfFeedback}%</div>
        </div>
      )}
    </>
  );
};

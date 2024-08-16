import { getDataLabelFromKey } from "../../utils/data";
import { ProfileCardCapsul } from "./ProfileCardCapsul";

export const CapsulList = ({ data, labels = null }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {data && data.length ? (
        <>
          {data.map((item) => {
            return (
              <ProfileCardCapsul key={item}>
                {labels ? getDataLabelFromKey(labels, item) : item}
              </ProfileCardCapsul>
            );
          })}
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

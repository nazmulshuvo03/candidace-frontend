import { Stars } from "../../Stars";

export const Notes = ({ data = null }) => {
  console.log("@@@@@@@@@", data);

  return (
    <div>
      {data && data.length ? (
        <>
          {data.map((item) => {
            return (
              <div key={item.id} className="flex mt-10">
                <div className="w-fit pr-6">
                  <img src={item.image} alt="Profile Image" className="w-36" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xl font-bold text-text">
                      {item.name}
                    </div>
                    <div className="text-xs font-light text-gray-500">
                      {item.currentCompany}
                    </div>
                  </div>
                  <div>
                    <Stars value={item.stars} />
                  </div>
                  <div className="text-gray-600">
                    <span className="mr-1">Interview Date: </span>
                    <span>{item.dateOfInterview}</span>
                  </div>
                  <div className="text-gray-600 flex gap-2">
                    <div>
                      <span className="mr-1">Matrics A: </span>
                      <span>{item.matricsA}</span>
                    </div>
                    <div>
                      <span className="mr-1">Matrics B: </span>
                      <span>{item.matricsB}</span>
                    </div>
                    <div>
                      <span className="mr-1">Matrics C: </span>
                      <span>{item.matricsC}</span>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <span className="mr-1">Comment:</span>
                    <span>{item.comment}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>No Notes</div>
      )}
    </div>
  );
};

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TestimonialCard = ({ data }) => {
  return (
    <div className="flex flex-col border border-text p-4">
      <div>
        {[...Array(data.star).keys()].map((i) => (
          <FontAwesomeIcon
            icon={faStar}
            key={i}
            className="h-4 w-4 text-yellow-500"
          />
        ))}
      </div>
      <div className="flex-1 py-4 text-xs md:text-base">{data.text}</div>
      <div className="flex gap-3 items-center">
        <img
          src={data.photo}
          alt={"Customer photo"}
          className="w-10 h-10 md:w-16 md:h-16"
        />
        <div>
          <div className="text-sm md:text-base font-semibold">{data.name}</div>
          <div className="text-xs md:text-sm font-normal">
            {data.position}, {data.company}
          </div>
        </div>
      </div>
    </div>
  );
};

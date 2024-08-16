export const Option = ({ option, defaultLabel, handleSelect }) => (
  <div
    className="flex items-center cursor-pointer"
    onClick={() => handleSelect(option)}
  >
    <div className="my-0.5 py-0.5 px-2 w-full rounded-sm text-sm text-gray-700 hover:bg-primary">
      {option[defaultLabel]}
    </div>
  </div>
);

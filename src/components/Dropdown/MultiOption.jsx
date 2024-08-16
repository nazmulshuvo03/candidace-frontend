export const MultiOption = ({
  option,
  defaultKey,
  defaultLabel,
  handleSelect,
  selectedOptions,
}) => (
  <label className="flex items-center cursor-pointer px-1 py-0.5 rounded-sm hover:bg-primary">
    <input
      type="checkbox"
      className="h-4 w-4 border-gray-300 rounded"
      onChange={() => {
        handleSelect(option[defaultKey]);
      }}
      checked={selectedOptions.includes(option[defaultKey])}
    />
    <span className="ml-2 text-sm text-gray-700">{option[defaultLabel]}</span>
  </label>
);

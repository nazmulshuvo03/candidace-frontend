export const RadioButtonGroup = ({
  label = "",
  options = [],
  selectedOption = "",
  onChange = () => {},
  ...rest
}) => {
  return (
    <div>
      <div>{label}</div>
      <div className="flex gap-2">
        {options.map(({ id, name }) => (
          <label
            key={id}
            className="inline-flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              value={id}
              checked={selectedOption === id}
              onChange={onChange}
              className={`h-5 w-5 appearance-none border-2 border-primary rounded-full bg-background checked:bg-primary`}
              {...rest}
            />
            <span className="text-text">{name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

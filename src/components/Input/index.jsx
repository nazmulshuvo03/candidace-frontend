export const Input = ({
  label,
  className,
  icon = null,
  iconClick = null,
  ...rest
}) => {
  return (
    <div className="w-full relative">
      <label className="text-xs">{label}</label>
      <input
        {...rest}
        className={`border rounded-lg text-sm px-4 py-2 w-full bg-white ${className}`}
      />
      <span
        onClick={iconClick}
        className={`absolute right-2.5 top-1.5 ${
          iconClick ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {icon}
      </span>
    </div>
  );
};

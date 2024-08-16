export const NoData = ({
  message = "No Data",
  size = 0,
  image = 0,
  className,
  fontClassName,
}) => {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center py-2 rounded-md ${className}`}
    >
      <img
        src={
          image === 1
            ? "/images/noData1.svg"
            : image === 2
            ? "/images/noData2.svg"
            : "/images/noData.svg"
        }
        className={`m-2`}
        style={size ? { height: `${size}px`, width: `${size}px` } : {}}
        alt="No Data"
      />
      <div
        className={`font-light text-sm md:text-xl text-text text-center ${fontClassName}`}
      >
        {message}
      </div>
    </div>
  );
};

export const PageBlock = ({ title = "", className, children, ...rest }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className={`w-11/12 h-5/6 overflow-y-auto rounded-md shadow-md ${className}`}
        {...rest}
      >
        <div
          className="font-normal text-xl p-2 mb-2 text-text font-sans 
        border-b border-b-gray-300"
        >
          {title}
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

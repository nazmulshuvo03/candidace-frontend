export const PageConentBlock = ({ title = "", children }) => (
  <div className="pt-1 pb-5">
    <div className="pb-2 font-medium text-text text-base">{title}</div>
    <div className="text-sm text-gray-600">{children}</div>
  </div>
);

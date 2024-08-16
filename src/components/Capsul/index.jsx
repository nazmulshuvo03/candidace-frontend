export const Capsul = ({ children = "", className }) => (
  <div
    className={`px-6 py-2 rounded-full bg-primary text-white font-normal text-base ${className}`}
  >
    {children}
  </div>
);

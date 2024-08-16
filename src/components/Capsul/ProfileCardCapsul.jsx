export const ProfileCardCapsul = ({ children = "", className }) => (
  <div
    className={`px-4 py-0 h-fit rounded-full font-normal text-xs text-gray-600 bg-gray-200 ${className}`}
    style={{ fontSize: 10 }}
  >
    {children}
  </div>
);

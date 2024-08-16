export const Chip = ({ children, deleteHandler = () => {} }) => (
  <div className="flex items-center m-1 py-1 px-2 border border-gray-400 rounded-full">
    <div className="pl-3 pr-2 text-sm">{children}</div>
    <div
      className="bg-gray-400 rounded-full text-xs text-white text-center h-4 w-4 cursor-pointer"
      onClick={deleteHandler}
    >
      x
    </div>
  </div>
);

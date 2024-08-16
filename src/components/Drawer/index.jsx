export const Drawer = ({ open = false, setOpen = () => {}, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 ${open ? "w-full" : "w-0"}`}
      onClick={() => setOpen(false)}
    >
      <div
        className={`h-full bg-white transition-all ease-in-out duration-200  ${
          open ? "w-fit" : "w-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

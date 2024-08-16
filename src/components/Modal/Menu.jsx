export const Menu = ({
  children,
  handlerComponent = <></>,
  showMenu = false,
  setShowMenu = () => {},
  menuClasses = "",
}) => {
  return (
    <div className="relative w-fit h-fit rounded-full z-20">
      <div className="cursor-pointer" onClick={() => setShowMenu(true)}>
        {handlerComponent}
      </div>
      {showMenu && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-50"
            style={{ backgroundColor: "rgba(0,0,0, 0.1)" }}
            onClick={() => setShowMenu(false)}
          />
          <div
            className={`absolute top-11 right-0 bg-white text-text rounded-sm drop-shadow-lg min-w-36 z-50 ${menuClasses}`}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

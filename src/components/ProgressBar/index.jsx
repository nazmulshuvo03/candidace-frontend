const CircularProgress = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: "rgb(143 143 143 / 80%)" }}
    >
      <div className="relative w-52 h-52 flex justify-center items-center">
        <div className="absolute w-full h-full rounded-full border-t-8 border-gray-100 animate-spin"></div>
        <div className="text-2xl font-bold text-gray-100">Loading</div>
      </div>
    </div>
  );
};

export default CircularProgress;

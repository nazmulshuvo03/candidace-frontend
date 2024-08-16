import ReactSlider from "react-slider";
import "./styles.css";

export const RangeSlider = ({
  label = "",
  lowerValue = 0,
  upperValue = 100,
  handleChange = () => {},
  min = 0,
  max = 100,
}) => {
  return (
    <div>
      <label>{label}</label>
      <ReactSlider
        min={min}
        max={max}
        value={[lowerValue, upperValue]}
        defaultValue={[lowerValue, upperValue]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        marks
        className="w-full h-1 my-4"
        thumbClassName="top-1/2 -translate-y-1/2 h-6 w-6 flex justify-center items-center 
      rounded-full font-semibold text-xs bg-accent text-white cursor-pointer focus:outline-none focus-visible:outline-none"
        //   thumbActiveClassName="h-7 w-6"
        trackClassName="top-0 h-1 rounded-sm bg-slate-200 custom-track-color"
        markClassName="w-1 h-1 bg-white cursor:pointer rounded-full"
        onChange={handleChange} // (value, index) => {}
      />
    </div>
  );
};

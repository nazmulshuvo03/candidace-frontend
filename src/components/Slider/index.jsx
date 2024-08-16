import "./styles.css";

export const Slider = ({ min, max, value, setValue = () => {} }) => {
  return (
    <div class="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

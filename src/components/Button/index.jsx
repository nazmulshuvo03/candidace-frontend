/**
 * Sizes: normal, small, big
 */

export const Button = ({ className, size = "normal", ...rest }) => {
  return (
    <>
      {size === "small" ? (
        <button
          {...rest}
          className={`w-fit rounded-sm px-6 py-1 bg-secondary text-xs md:text-sm text-white font-semibold whitespace-nowrap ${className}`}
        />
      ) : size === "large" ? (
        <button
          {...rest}
          className={`w-fit rounded-sm px-5 md:px-6 py-2 md:py-3 bg-secondary text-base md:text-lg text-white font-semibold whitespace-nowrap ${className}`}
        />
      ) : (
        <button
          {...rest}
          className={`w-fit rounded-sm px-4 md:px-5 py-1 md:py-2 bg-secondary text-sm md:text-base text-white font-semibold whitespace-nowrap ${className}`}
        />
      )}
    </>
  );
};

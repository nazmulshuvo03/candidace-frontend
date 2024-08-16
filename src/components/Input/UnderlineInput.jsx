import { Input } from ".";

export const UnderlineInput = ({ className, ...props }) => {
  return (
    <Input
      {...props}
      className={`border-t-0 border-l-0 border-r-0 !border-b !rounded-none !px-1 !md:px-2 !py-0 !md:py-1 ${className}`}
    />
  );
};

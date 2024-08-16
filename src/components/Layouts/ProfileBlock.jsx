import { Block } from "./Block";

export const ProfileBlock = (props) => {
  return (
    <Block {...props} titleClass="justify-center">
      {props.children}
    </Block>
  );
};

import { SignupIntro } from "./Singup";

export const Intro = ({ type = "" }) => {
  return <>{type === "signup" && <SignupIntro />}</>;
};

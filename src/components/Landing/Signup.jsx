import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "../Button";
import { Input } from "../Input";
import { signupUser } from "../../store/middlewares/auth";
import { Dropdown } from "../Dropdown";
import { isEmail } from "validator";
import { GoogleAuth } from "./GoogleAuth";

export const Signup = ({ switchMode = () => {} }) => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    targetProfessionId: "",
  });
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!state.email) setErrorMessage("Email can not be empty");
    else if (!isEmail(state.email)) setErrorMessage("Invalid Email");
    else if (!state.password) setErrorMessage("Password can not be empty");
    else if (!state.confirmPassword)
      setErrorMessage("Please confirm your password");
    else if (!state.targetProfessionId)
      setErrorMessage("Please choose a career path");
    else if (!agree) setErrorMessage("Please read our Terms and Conditions");
    else dispatch(signupUser(state));
  };

  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    if (professions && professions.length) {
      setState((prev) => ({ ...prev, targetProfessionId: professions[0].id }));
    }
  }, [professions]);

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div>
        <div className="flex flex-col items-center justify-center py-4">
          <img
            src={"/images/landingPage/signup.svg"}
            alt="Signup"
            className="h-40 w-40"
          />
          <div className="text-2xl font-semibold text-secondary">Welcome!</div>
        </div>
        <form className="grid grid-cols-1 gap-1" onSubmit={handleSignup}>
          <Input
            type="email"
            label={"Email Address"}
            name="email"
            value={state.email}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            label={"Password"}
            name="password"
            value={state.password}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Input
            type="password"
            label={"Confirm Password"}
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Dropdown
            name={"targetProfessionId"}
            value={state.targetProfessionId || ""}
            options={professions}
            onSelect={(e) =>
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            label="Career Path"
            allowSearch={false}
          />
          <div className="py-2 flex items-center justify-start gap-1 text-xs text-secondary">
            <input
              type="checkbox"
              value={agree}
              onChange={(e) => setAgree((prev) => !prev)}
            />
            <Link href={"/terms-and-conditions"}>
              I agree to the Terms & Conditions
            </Link>
          </div>
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Button
              onClick={handleSignup}
              className={"!w-72 !bg-secondary !py-1"}
            >
              Sign Up
            </Button>
            <GoogleAuth
              additionalData={{
                targetProfessionId: state.targetProfessionId,
              }}
            />
          </div>
          <div className="py-2 flex justify-center gap-1 text-sm text-text underline">
            <div>Alreay have an account ?</div>
            <div
              onClick={() => switchMode("login")}
              className="text-secondary font-medium cursor-pointer"
            >
              Sign In
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

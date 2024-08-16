import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";
import { useEffect, useState } from "react";
import { sendForgetPassword } from "../../store/middlewares/auth";
import { isEmail } from "validator";

export const ForgetPass = ({ switchMode = () => {} }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!state.email) setErrorMessage("Email can not be empty");
    else if (!isEmail(state.email)) setErrorMessage("Invalid Email");
    else dispatch(sendForgetPassword(state));
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

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div>
        <div className="flex flex-col items-center justify-center py-4">
          <img
            src={"/images/landingPage/login.svg"}
            alt="Login"
            className="h-40 w-40"
          />
          <div className="text-2xl font-semibold text-secondary">
            Welcome back!
          </div>
        </div>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleLogin}>
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
          <div className="text-xs text-red-500 font-medium min-h-4 text-center">
            {errorMessage}
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Button
              onClick={handleLogin}
              className={"!w-72 !bg-secondary !py-1"}
            >
              Send Reset Link
            </Button>
          </div>
          <div className="py-2 flex justify-center gap-1 text-sm text-text underline">
            <div>Don't have an account ?</div>
            <div
              onClick={switchMode}
              className="text-secondary font-medium cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

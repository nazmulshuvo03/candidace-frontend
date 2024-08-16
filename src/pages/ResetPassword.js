import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { resetPassword } from "../store/middlewares/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage("Please provide your new password");
    } else if (password !== confirm) {
      setErrorMessage("Passwords do not match");
    } else {
      dispatch(
        resetPassword({
          token,
          password,
        })
      );
    }
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
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="w-1/3 h-2/3 flex flex-col gap-2 items-center"
        onSubmit={handleConfirm}
      >
        <h1 className="text-2xl">Reset Password</h1>
        <Input
          type="password"
          label={"New Password"}
          name="new_password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          label={"Confirm Password"}
          name="confirm_password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div className="text-xs text-red-500 font-medium min-h-4 text-center">
          {errorMessage}
        </div>
        <Button onClick={handleConfirm} className={"!w-72 !bg-secondary !py-1"}>
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;

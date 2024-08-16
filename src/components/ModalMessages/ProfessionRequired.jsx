import { useEffect, useState } from "react";
import { Dropdown } from "../Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { googleAuthUser } from "../../store/middlewares/auth";

export const ProfessionRequired = ({ data }) => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);

  const [targetProfessionId, setTargetProfessionId] = useState();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!targetProfessionId) setErrorMessage("Please choose a career path");
    else
      dispatch(
        googleAuthUser({
          ...data,
          targetProfessionId,
        })
      );
  };

  useEffect(() => {
    if (professions && professions.length) {
      setTargetProfessionId(professions[0].id);
    }
  }, [professions]);

  return (
    <div className="py-8 px-8 min-h-60 flex flex-col gap-4">
      <div>Please confirm your career path</div>
      <Dropdown
        name={"targetProfessionId"}
        value={targetProfessionId || ""}
        options={professions}
        onSelect={(e) => setTargetProfessionId(e.target.value)}
        label="Career Path"
        allowSearch={false}
      />
      <Button onClick={handleSignup} className={"!w-full !bg-secondary !py-1"}>
        Create New Account
      </Button>
    </div>
  );
};

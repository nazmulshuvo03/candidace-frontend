import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "../../../Dropdown";
import { addAndGetCompany } from "../../../../store/middlewares/static";

export const Interview = ({ data, handleChange = () => {} }) => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const { role, companyId } = data;

  const handleAddNewCompany = async (data) => {
    const res = await dispatch(addAndGetCompany(data));
    return res;
  };

  return (
    <>
      <Dropdown
        name={"role"}
        value={role || ""}
        options={professions}
        onSelect={handleChange}
        label="Role *"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          label="Company *"
          allowAddNew={true}
          addNewAction={handleAddNewCompany}
        />
      </div>
    </>
  );
};

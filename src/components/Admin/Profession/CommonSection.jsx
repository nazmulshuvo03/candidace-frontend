import { useDispatch } from "react-redux";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { setToastMessage } from "../../../store/slices/global";

export const Section = ({
  children,
  title = "Section",
  profession = "",
  actionHandler = () => {},
  query = "",
  setQuery = () => {},
}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!query || query === " ") {
      dispatch(setToastMessage("Empty input"));
    } else {
      dispatch(
        actionHandler({
          name: query,
          profession_id: profession,
        })
      );
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col border rounded-md m-1 w-full h-full overflow-y-auto">
      <div className="bg-gray-700 text-white text-center py-1">{title}</div>
      <div className="flex-1">
        <div className="flex flex-wrap">{children}</div>
      </div>
      <div className="px-2 my-2 flex gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleAdd}>Add New</Button>
      </div>
    </div>
  );
};

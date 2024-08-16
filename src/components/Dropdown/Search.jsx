import { Button } from "../Button";
import { Input } from "../Input";

export const DropdownSearch = ({
  query,
  setQuery = () => {},
  allowAddNew = false,
  filteredOptions,
  handleAddNewClick = () => {},
}) => {
  return (
    <div className="flex gap-0">
      <Input
        type="text"
        placeholder="Search..."
        name=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {allowAddNew &&
      query &&
      query.length &&
      filteredOptions &&
      !filteredOptions.length ? (
        <Button onClick={handleAddNewClick} className={"!rounded-lg ml-1"}>
          Add
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};

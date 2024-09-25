import { Input } from "../Input";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const Search = ({
  query = "",
  setQuery = () => {},
  handleSearch = () => {},
  resetSearch = () => {},
  showResetSearch = false,
}) => {
  return (
    <div className="flex gap-8">
      <Input
        type="text"
        placeholder="Search Jobs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={showResetSearch && <FontAwesomeIcon icon={faClose} />}
        iconClick={resetSearch}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

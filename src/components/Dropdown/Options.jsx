import { NoData } from "../NoData";
import { MultiOption } from "./MultiOption";
import { Option } from "./Option";
import { DropdownSearch } from "./Search";

export const Options = ({
  allowSearch,
  query,
  setQuery,
  allowAddNew,
  filteredOptions,
  handleAddNewClick,
  defaultKey,
  defaultLabel,
  handleSelect,
  multiple = false,
  selectedOptions,
}) => {
  return (
    <div
      className="z-30 absolute top-full left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div className="max-h-56 overflow-y-auto py-2 px-2">
        {allowSearch ? (
          <DropdownSearch
            {...{
              query,
              setQuery,
              allowAddNew,
              filteredOptions,
              handleAddNewClick,
            }}
          />
        ) : (
          <div />
        )}
        <div className="py-1">
          {filteredOptions && filteredOptions.length ? (
            filteredOptions.map((option) => (
              <div key={option[defaultKey]}>
                {multiple ? (
                  <MultiOption
                    {...{
                      option,
                      defaultKey,
                      defaultLabel,
                      handleSelect,
                      selectedOptions,
                    }}
                  />
                ) : (
                  <Option {...{ option, defaultLabel, handleSelect }} />
                )}
              </div>
            ))
          ) : (
            <div className="h-fit flex items-center justify-center">
              <NoData size={80} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

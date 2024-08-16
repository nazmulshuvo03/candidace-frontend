import React, { useEffect, useRef, useState } from "react";
import { Options } from "./Options";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import { useDispatch } from "react-redux";

export const MultiInputDropdown = ({
  label = "",
  name = "",
  options = [],
  value = [],
  onSelect = () => {},
  defaultText = "",
  defaultKey = "id",
  defaultLabel = "name",
  allowSearch = true,
  allowAddNew = false,
  addNewAction = () => {},
  size = "normal", // "normal", "small"
  max = null,
}) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState();
  const [query, setQuery] = useState("");

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prev) => prev.filter((item) => item !== option));
    } else {
      setSelectedOptions((prev) => {
        if (max && prev.length >= max) {
          dispatch(
            setToastMessage({
              type: TOAST_TYPES[1],
              message: `Maximum ${max} items can be selected`,
            })
          );
          return prev;
        } else return [...prev, option];
      });
    }
  };

  const handleInputClick = () => {
    setDropdownOpen((prev) => !prev);
    setQuery("");
    setFilteredOptions(options);
  };

  const handleAddNewClick = async () => {
    const response = await addNewAction({ name: query });
    if (response) handleCheckboxChange(response.id);
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setQuery("");
        setFilteredOptions(options);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value && value.length) setSelectedOptions(value);
  }, [value]);

  useEffect(() => {
    onSelect({
      target: {
        name,
        value: selectedOptions,
      },
    });
  }, [selectedOptions]);

  useEffect(() => {
    if (query && query.length) {
      setFilteredOptions(() =>
        options.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredOptions(options);
  }, [query]);

  return (
    <div ref={dropdownRef} className="w-full flex flex-col">
      <label className="text-xs">{label}</label>
      <div className="relative">
        <div
          onClick={handleInputClick}
          className="flex-1 flex flex-wrap gap-2 rounded-lg border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          {selectedOptions && selectedOptions.length ? (
            selectedOptions.map((seleted) => {
              const selectedOption = options.find(
                (option) => option[defaultKey] === seleted
              );
              if (selectedOption) {
                return (
                  <div
                    key={seleted}
                    className={`bg-gray-400 text-white rounded-md py-1 px-2 ${
                      size === "small" ? "text-xs" : "text-sm"
                    }`}
                  >
                    {selectedOption[defaultLabel]}
                  </div>
                );
              }
            })
          ) : (
            <span className="text-gray-400">{defaultText}</span>
          )}
        </div>
        {dropdownOpen && (
          <Options
            {...{
              allowSearch,
              query,
              setQuery,
              allowAddNew,
              filteredOptions,
              handleAddNewClick,
              defaultKey,
              defaultLabel,
              handleSelect: handleCheckboxChange,
              multiple: true,
              selectedOptions,
            }}
          />
        )}
      </div>
    </div>
  );
};

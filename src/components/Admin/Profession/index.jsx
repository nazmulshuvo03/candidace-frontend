import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  deleteProfession,
  fetchProfessions,
} from "../../../store/middlewares/profession";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Skills } from "./Skills";
import { ExperienceTypes } from "./ExperienceTypes";

export const ProfessionAdmin = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  useEffect(() => {
    if (query && query.length) {
      setFilteredData(() =>
        professions.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredData(professions);
  }, [query, professions]);

  const addNewProfession = () => {
    dispatch(
      addProfession({
        name: query,
      })
    );
    setQuery("");
    setFilteredData(professions);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          className=""
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={addNewProfession} className={"!rounded-md"}>
          Add Profession
        </Button>
      </div>
      <div style={{ height: "70vh", overflowY: "auto" }}>
        {filteredData && filteredData.length ? (
          filteredData.map((profession) => {
            return (
              <div
                key={profession.id}
                className="my-4 rounded-md border border-gray-200"
              >
                <div className="flex items-center justify-between bg-secondary text-white font-bold text-lg py-2 px-3 rounded-t-md">
                  <div>{profession.name}</div>
                  <div
                    className="bg-accent rounded-full text-md text-white text-center h-8 w-8 cursor-pointer"
                    onClick={() => dispatch(deleteProfession(profession.id))}
                  >
                    x
                  </div>
                </div>
                <div className="p-1 mb-2 flex flex-col md:flex-row justify-between items-start h-60">
                  <Skills
                    professionId={profession.id}
                    data={profession.skills}
                  />
                  <ExperienceTypes
                    professionId={profession.id}
                    data={profession.experienceTypes}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

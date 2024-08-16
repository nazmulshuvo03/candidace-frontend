import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addExperienceType,
  deleteExperienceType,
} from "../../../store/middlewares/skill";
import { Chip } from "./Chip";
import { Section } from "./CommonSection";

export const ExperienceTypes = ({ professionId = "", data = null }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (query && query.length && data && data.length) {
      setFilteredData(() =>
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else setFilteredData(data);
  }, [query, data]);

  return (
    <Section
      title="Experience Types"
      profession={professionId}
      actionHandler={addExperienceType}
      query={query}
      setQuery={setQuery}
    >
      {filteredData && filteredData.length ? (
        filteredData.map((et) => {
          return (
            <Chip
              key={et.id}
              deleteHandler={() =>
                dispatch(deleteExperienceType(et.id, professionId))
              }
            >
              {et.name}
            </Chip>
          );
        })
      ) : (
        <div />
      )}
    </Section>
  );
};

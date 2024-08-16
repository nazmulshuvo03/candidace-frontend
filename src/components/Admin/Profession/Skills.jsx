import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSkill, deleteSkill } from "../../../store/middlewares/skill";
import { Chip } from "./Chip";
import { Section } from "./CommonSection";

export const Skills = ({ professionId = "", data = null }) => {
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
      title="Skills"
      profession={professionId}
      actionHandler={addSkill}
      query={query}
      setQuery={setQuery}
    >
      {filteredData && filteredData.length ? (
        filteredData.map((skill) => {
          return (
            <Chip
              key={skill.id}
              deleteHandler={() =>
                dispatch(deleteSkill(skill.id, professionId))
              }
            >
              {skill.name}
            </Chip>
          );
        })
      ) : (
        <div />
      )}
    </Section>
  );
};

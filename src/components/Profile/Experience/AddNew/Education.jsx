import { Input } from "../../../Input";

export const Education = ({ data, handleChange = () => {} }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Input
        label="Degree *"
        name="degree"
        value={data.degree}
        onChange={handleChange}
      />
      <Input
        label="Major *"
        name="major"
        value={data.major}
        onChange={handleChange}
      />
      <Input
        label="Institution *"
        name="institution"
        value={data.institution}
        onChange={handleChange}
      />
      <Input
        label="Year of Graduation"
        name="year_of_graduation"
        value={data.year_of_graduation}
        onChange={handleChange}
      />
    </div>
  );
};

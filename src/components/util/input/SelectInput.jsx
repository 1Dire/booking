import { Select } from "flowbite-react";

export function SelectInput({ options = [], onChange, value, name }) {
  return (
    <div className="max-w-md">
      <Select
        id="season-type"
        required
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="">선택해주세요</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
